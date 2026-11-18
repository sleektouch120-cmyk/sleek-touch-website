import {randomUUID} from 'node:crypto';
import {isAdmin,sameOrigin,json} from '@/lib/admin-auth';
import {redis} from '@/lib/redis';
export async function POST(request:Request){
 if(!sameOrigin(request)||!await isAdmin())return json({error:'Sign in required.'},403);
 try{const text=await request.text();if(text.length>1000000)return json({error:'Please choose a smaller image.'},413);const {data}=JSON.parse(text);if(typeof data!=='string')return json({error:'Choose an image.'},400);const match=data.match(/^data:image\/(jpeg|png|webp);base64,([A-Za-z0-9+/=]+)$/);if(!match)return json({error:'Use a JPG, PNG, or WebP image.'},400);const bytes=Buffer.from(match[2],'base64');const mime=match[1];const valid=mime==='jpeg'?bytes[0]===255&&bytes[1]===216&&bytes[2]===255:mime==='png'?bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a':bytes.subarray(0,4).toString()==='RIFF'&&bytes.subarray(8,12).toString()==='WEBP';if(!valid||bytes.length>700000)return json({error:'Invalid image or image too large.'},400);const id=randomUUID();await redis(['SET','sleektouch:media:'+id,JSON.stringify({mime:'image/'+mime,data:match[2]})]);return json({url:'/api/media/'+id});}catch{return json({error:'Image upload failed. Try again.'},503)}
}
