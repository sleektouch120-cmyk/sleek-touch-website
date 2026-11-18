export async function redis<T=unknown>(command:(string|number)[]):Promise<T>{
 const url=process.env.UPSTASH_REDIS_REST_URL||process.env.KV_REST_API_URL,token=process.env.UPSTASH_REDIS_REST_TOKEN||process.env.KV_REST_API_TOKEN;
 if(!url||!token)throw new Error('Order storage is not configured.');
 const response=await fetch(url,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(command),cache:'no-store',signal:AbortSignal.timeout(8000)});
 if(!response.ok)throw new Error('Order storage request failed.');
 const data=await response.json();if(data.error)throw new Error('Order storage command failed.');return data.result as T;
}
export async function rateLimit(identity:string){
 const script="local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],600) end; return n";
 return (await redis<number>(['EVAL',script,1,`ruhmira:rate:${identity}`]))<=8;
}
