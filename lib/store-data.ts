import {redis} from './redis';
import {initialProduct,type Product} from './products';
export function storageConfigured(){return Boolean((process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL)&&(process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN))}
export async function getProducts(includeDrafts=false):Promise<Product[]>{
 if(!storageConfigured())return [initialProduct];
 await redis(['HSETNX','sleektouch:slugs',initialProduct.slug,initialProduct.id]);
 await redis(['HSETNX','sleektouch:products',initialProduct.id,JSON.stringify(initialProduct)]);
 const rows=await redis<string[]>(['HVALS','sleektouch:products']);
 return rows.map(s=>JSON.parse(s) as Product).filter(p=>includeDrafts||p.published).sort((a,b)=>a.name.localeCompare(b.name));
}
export async function saveProduct(product:Product){
 // Slug reservation and the product write are atomic across dashboard sessions.
 const result=await redis<number>(['EVAL',"local owner=redis.call('HGET',KEYS[2],ARGV[2]); if owner and owner~=ARGV[1] then return 0 end; local old=redis.call('HGET',KEYS[1],ARGV[1]); if old then local p=cjson.decode(old); if p.slug~=ARGV[2] then redis.call('HDEL',KEYS[2],p.slug) end end; redis.call('HSET',KEYS[2],ARGV[2],ARGV[1]); redis.call('HSET',KEYS[1],ARGV[1],ARGV[3]); return 1",2,'sleektouch:products','sleektouch:slugs',product.id,product.slug,JSON.stringify(product)]);
 if(!result)throw new Error('That product URL is already in use. Choose another name or URL.');
}
