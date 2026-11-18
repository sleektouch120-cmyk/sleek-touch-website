import {cookies} from 'next/headers';
import {createHmac,randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
export const sessionCookie='sleektouch_admin';
const lifetime=60*60*12;
export function verifyPassword(password:string,encoded=process.env.ADMIN_PASSWORD_HASH||''){
 try{const [salt,hash]=encoded.trim().split(':');if(!salt||!hash)return false;const expected=Buffer.from(hash,'hex'),actual=scryptSync(password,salt,64);return expected.length===actual.length&&timingSafeEqual(expected,actual)}catch{return false}
}
export function signSession(){const secret=process.env.ADMIN_SESSION_SECRET;if(!secret||!process.env.ADMIN_PASSWORD_HASH)throw new Error('Dashboard login is not configured.');const payload=Buffer.from(JSON.stringify({exp:Date.now()+lifetime*1000,nonce:randomBytes(16).toString('hex')})).toString('base64url');return payload+'.'+createHmac('sha256',secret+process.env.ADMIN_PASSWORD_HASH).update(payload).digest('base64url')}
export function validSession(token:string){try{const secret=process.env.ADMIN_SESSION_SECRET;if(!secret||!process.env.ADMIN_PASSWORD_HASH)return false;const [payload,signature,...extra]=token.split('.');if(extra.length||!payload||!signature)return false;const expected=createHmac('sha256',secret+process.env.ADMIN_PASSWORD_HASH).update(payload).digest();const received=Buffer.from(signature,'base64url');if(received.length!==expected.length||!timingSafeEqual(received,expected))return false;return JSON.parse(Buffer.from(payload,'base64url').toString()).exp>Date.now()}catch{return false}}
export async function isAdmin(){return validSession((await cookies()).get(sessionCookie)?.value||'')}
export function sameOrigin(request:Request){return request.headers.get('origin')===new URL(request.url).origin}
export const cookieOptions={httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict' as const,path:'/',maxAge:lifetime};
export function json(body:unknown,status=200){return Response.json(body,{status,headers:{'Cache-Control':'no-store'}})}
