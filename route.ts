import {cookies} from 'next/headers';
import {createHash} from 'node:crypto';
import {verifyPassword,signSession,sessionCookie,cookieOptions,sameOrigin,json} from '@/lib/admin-auth';
import {redis} from '@/lib/redis';
import {storageConfigured} from '@/lib/store-data';
export async function POST(request:Request){
 if(!sameOrigin(request))return json({error:'Invalid origin.'},403);
 if(!storageConfigured()||!process.env.ADMIN_PASSWORD_HASH||!process.env.ADMIN_SESSION_SECRET)return json({error:'The owner needs to finish connecting the dashboard.'},503);
 try{const text=await request.text();if(text.length>2000)return json({error:'Invalid request.'},400);const {password}=JSON.parse(text);if(typeof password!=='string'||password.length>200)return json({error:'Incorrect password.'},401);
 const ip=request.headers.get('x-vercel-forwarded-for')||request.headers.get('x-forwarded-for')?.split(',')[0]||'local';const key='sleektouch:login:'+createHash('sha256').update(ip).digest('hex');
 const count=await redis<number>(['EVAL',"local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],900) end; return n",1,key]);
 if(count>10)return json({error:'Too many attempts. Try again in 15 minutes.'},429);
 if(!verifyPassword(password))return json({error:'Incorrect password.'},401);
 (await cookies()).set(sessionCookie,signSession(),cookieOptions);return json({ok:true});
 }catch{return json({error:'Could not sign in. Please try again.'},503)}
}
export async function DELETE(request:Request){if(!sameOrigin(request))return json({error:'Invalid origin.'},403);(await cookies()).set(sessionCookie,'',{...cookieOptions,maxAge:0});return json({ok:true})}
