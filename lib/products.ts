import {z} from 'zod';
import {collections,product} from './catalog';
const imagePath=z.string().regex(/^\/(?:images\/[a-zA-Z0-9._-]+|api\/media\/[a-f0-9-]+)$/);
export const productSchema=z.object({
 id:z.string().regex(/^[a-z0-9-]{1,80}$/),slug:z.string().regex(/^[a-z0-9-]{1,100}$/),
 name:z.string().trim().min(2).max(120),vendor:z.string().trim().max(80).default('Sleek Touch'),
 description:z.string().trim().max(4000),subtitle:z.string().trim().max(200).default(''),
 price:z.number().finite().min(1).max(1000000),compareAt:z.number().finite().min(0).max(1000000).default(0),
 image:z.string().regex(/^\/(?:images\/[a-zA-Z0-9._-]+|api\/media\/[a-f0-9-]+)$/),
 originalImage:z.string().regex(/^\/(?:images\/[a-zA-Z0-9._-]+|api\/media\/[a-f0-9-]+)$/).optional(),
 images:z.array(imagePath).min(1).max(6).optional(),
 categories:z.array(z.string().refine(s=>collections.some(c=>c.slug===s))).min(1).max(8),
 option:z.string().trim().min(1).max(80).default('Standard'),maxQuantity:z.number().int().min(1).max(50).default(5),
 published:z.boolean(),readyForSale:z.boolean().default(true),
}).strict().refine(p=>p.compareAt===0||p.compareAt>=p.price,{message:'Original price must be at least the selling price.'}).refine(p=>!p.images||(p.images[0]===p.image&&new Set(p.images).size===p.images.length),{message:'Choose a unique set of photos with the cover photo first.'});
export type Product=z.infer<typeof productSchema>;
export const initialProduct:Product={id:product.id,slug:product.slug,name:product.name,vendor:product.vendor,description:product.description,subtitle:product.subtitle,price:product.price,compareAt:product.compareAt,image:product.image,originalImage:product.originalImage,maxQuantity:product.maxQuantity,categories:['makeup'],option:'04 Natural',published:true,readyForSale:false};
export type CartItem={productId:string;quantity:number};

export function productImages(p:Pick<Product,'image'|'images'|'originalImage'>):string[]{return p.images?.length?[...p.images]:[...new Set([p.image,p.originalImage].filter((src):src is string=>Boolean(src)))];}
