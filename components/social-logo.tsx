type Platform='instagram'|'facebook'|'whatsapp';

export default function SocialLogo({platform,size=32}:{platform:Platform;size?:number}){
  return <span className={`social-logo social-logo-${platform}`} style={{width:size,height:size}} aria-hidden="true"><svg viewBox="0 0 24 24" width="100%" height="100%" fill="none" focusable="false">
    {platform==='instagram'&&<g stroke="white" strokeWidth="1.8"><rect x="5" y="5" width="14" height="14" rx="4"/><circle cx="12" cy="12" r="3.4"/><circle cx="16.6" cy="7.5" r=".9" fill="white" stroke="none"/></g>}
    {platform==='facebook'&&<path fill="white" d="M13.8 24v-9.2h3.1l.5-3.6h-3.6V8.9c0-1 .3-1.7 1.8-1.7h1.9V4a24 24 0 0 0-2.8-.2c-2.8 0-4.7 1.7-4.7 4.8v2.6H7v3.6h3V24z"/>}
    {platform==='whatsapp'&&<g fill="white"><path fillRule="evenodd" d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm0 1.7a7.3 7.3 0 1 1-3.8 13.5l-.3-.2-2.5.7.7-2.4-.2-.3A7.3 7.3 0 0 1 12 4.7Z"/><path d="M8.4 7.6c-.2-.4-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-.9.9-.9 2.1s.9 2.4 1 2.6c.1.2 1.8 2.8 4.3 3.8 2.1.8 2.5.7 3 .6.4-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.7-.4l-1.7-.8c-.3-.1-.5-.2-.7.2l-.8 1c-.1.2-.3.2-.6.1a7.3 7.3 0 0 1-2-1.2 7.6 7.6 0 0 1-1.4-1.7c-.1-.3 0-.4.1-.5l.5-.6c.2-.2.2-.3.3-.5.1-.1 0-.3 0-.5l-.9-1.8Z"/></g>}
  </svg></span>
}
