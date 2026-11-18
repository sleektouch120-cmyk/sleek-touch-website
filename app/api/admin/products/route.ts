import {isAdmin,sameOrigin,json} from '@/lib/admin-auth';
import {getProducts,saveProduct} from '@/lib/store-data';
import {productSchema} from '@/lib/products';
export async function GET(){if(!await isAdmin())return json({error:'Sign in required.'},401);try{return json({products:await getProducts(true)})}catch{return json({error:'Could not load products.'},503)}}
export async function POST(request:Request){
 if(!sameOrigin(request)||!await isAdmin())return json({error:'Sign in required.'},403);
 try{const raw=await request.text();if(raw.length>15000)return json({error:'Product details are too long.'},413);const parsed=productSchema.safeParse(JSON.parse(raw));if(!parsed.success)return json({error:parsed.error.issues[0].message},400);
 const products=await getProducts(true);if(products.some(p=>p.slug===parsed.data.slug&&p.id!==parsed.data.id))return json({error:'That product URL already exists.'},409);
 await saveProduct(parsed.data);return json({ok:true,product:parsed.data});}catch{return json({error:'Could not save. Please try again and check the product URL is unique.'},503)}
}
