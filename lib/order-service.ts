import {createHash} from 'node:crypto';
import {type OrderInput,type Order,priceItems,orderTotals} from './order-validation';
import type {Product} from './products';
import {storageConfigured} from './store-data';
import {redis} from './redis';
export function checkoutConfigured(){return storageConfigured()&&process.env.STORE_ORDERS_ENABLED==='true'}
export function inputFingerprint(input:OrderInput){return createHash('sha256').update(JSON.stringify({name:input.name,phone:input.phone,address:input.address,items:input.items})).digest('hex')}
export function buildOrder(input:OrderInput,products:Product[]):Order{const items=priceItems(input,products);return {id:input.idempotencyKey,reference:'ST-'+input.idempotencyKey.replaceAll('-','').slice(0,12).toUpperCase(),createdAt:new Date().toISOString(),fingerprint:inputFingerprint(input),status:'received',paymentMethod:'cod',paymentStatus:'unpaid',customer:{name:input.name,phone:input.phone,address:input.address},items,...orderTotals(items.reduce((s,i)=>s+i.quantity*i.unitPrice,0)),currency:'PKR'}}
export async function findOrder(input:OrderInput){const raw=await redis<string|null>(['GET','sleektouch:order:'+input.idempotencyKey]);if(!raw)return null;const order=JSON.parse(raw) as Order;if(order.fingerprint!==inputFingerprint(input))throw new Error('IDEMPOTENCY_CONFLICT');return order}
export async function saveOrder(order:Order):Promise<{order:Order;existing:boolean}>{const previous=await redis<string>(['EVAL',"local existing=redis.call('GET',KEYS[1]); if existing then return existing end; redis.call('SET',KEYS[1],ARGV[1]); redis.call('ZADD',KEYS[2],ARGV[2],ARGV[3]); return ''",2,'sleektouch:order:'+order.id,'sleektouch:orders',JSON.stringify(order),Date.now(),order.id]);if(previous){const saved=JSON.parse(previous) as Order;if(saved.fingerprint!==order.fingerprint)throw new Error('IDEMPOTENCY_CONFLICT');return {order:saved,existing:true}}return {order,existing:false}}
export function receipt(order:Order){return {reference:order.reference,total:order.total,quantity:order.items.reduce((s,i)=>s+i.quantity,0),paymentMethod:'cod'}}
