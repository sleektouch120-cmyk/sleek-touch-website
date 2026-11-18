import {createHash} from 'node:crypto';
import {orderSchema} from '@/lib/order-validation';
import {checkoutConfigured,buildOrder,saveOrder,receipt,findOrder} from '@/lib/order-service';
import {getProducts} from '@/lib/store-data';
import {rateLimit} from '@/lib/redis';
import {json,sameOrigin} from '@/lib/admin-auth';
export const runtime='nodejs';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Please place your order from our website.'},403);
 if(!request.headers.get('content-type')?.includes('application/json'))return json({error:'Invalid request format.'},415);
 if(!checkoutConfigured())return json({error:'Online ordering is being prepared. Please check back soon.'},503);
 let parsed;try{const body=await request.text();if(body.length>12000)return json({error:'Order details are too long.'},413);parsed=orderSchema.safeParse(JSON.parse(body));}catch{return json({error:'Please check your order details.'},400)}
 if(!parsed.success)return json({error:parsed.error.issues[0].message},400);
 try{const ip=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()||'local';if(!await rateLimit(createHash('sha256').update(ip).digest('hex').slice(0,24)))return json({error:'Too many attempts. Please try again in a few minutes.'},429);
 const existing=await findOrder(parsed.data);if(existing)return json({ok:true,order:receipt(existing)});
 const products=await getProducts();let order;try{order=buildOrder(parsed.data,products)}catch(e){return json({error:e instanceof Error?e.message:'Please review your bag.'},400)}
 const saved=await saveOrder(order);return json({ok:true,order:receipt(saved.order)},saved.existing?200:201);
 }catch(e){if(e instanceof Error&&e.message==='IDEMPOTENCY_CONFLICT')return json({error:'Order attempt already exists with different details. Start a new order.'},409);return json({error:'We could not confirm your order. Please retry; a repeated submission will not create a duplicate.'},503)}
}
