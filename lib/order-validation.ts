import {z} from 'zod';
import {brand} from './catalog';
import type {Product} from './products';
export const orderSchema=z.object({name:z.string().trim().min(2,'Please enter your full name.').max(100),phone:z.string().trim().transform(s=>s.replace(/[\s()-]/g,'')).refine(s=>/^(?:\+92|92|0)3\d{9}$/.test(s),'Enter a valid Pakistani mobile number.'),address:z.string().trim().min(15,'Please include your street, area and city.').max(700),items:z.array(z.object({productId:z.string().max(80),quantity:z.number().int().min(1).max(50)}).strict()).min(1).max(30),idempotencyKey:z.uuid(),website:z.string().max(0).optional().default('')}).strict();
export type OrderInput=z.infer<typeof orderSchema>;
export const orderStatuses=['received','confirmed','shipped','completed','cancelled'] as const;
export type OrderStatus=typeof orderStatuses[number];
export type Order={id:string;reference:string;createdAt:string;fingerprint:string;status:OrderStatus;paymentMethod:'cod';paymentStatus:'unpaid';customer:{name:string;phone:string;address:string};items:{productId:string;title:string;option:string;quantity:number;unitPrice:number}[];subtotal:number;shipping:number;total:number;currency:'PKR'};
export function priceItems(input:OrderInput,products:Product[]){const seen=new Set<string>();return input.items.map(item=>{if(seen.has(item.productId))throw new Error('Duplicate product in bag.');seen.add(item.productId);const p=products.find(p=>p.id===item.productId);if(!p||!p.published||!p.readyForSale)throw new Error('A product in your bag is not available for ordering.');if(item.quantity>p.maxQuantity)throw new Error('Please reduce the quantity for '+p.name+'.');return {productId:p.id,title:p.name,option:p.option,quantity:item.quantity,unitPrice:p.price}})}
export function orderTotals(subtotal:number){const shipping=subtotal>=brand.freeShippingAt?0:brand.shipping;return {subtotal:Math.round(subtotal*100)/100,shipping,total:Math.round((subtotal+shipping)*100)/100}}
