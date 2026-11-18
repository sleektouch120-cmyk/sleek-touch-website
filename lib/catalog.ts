export const brand = {
  name:'Sleek Touch', tagline:'Beauty and style, your way.',
  phone:'+923052849415', phoneDisplay:'+92 305 2849415',
  whatsapp:'923052849415', instagram:'https://www.instagram.com/sleektouch120/',
  facebook:'https://www.facebook.com/profile.php?id=61594979302920', email:'sleektouch120@gmail.com',
  // Working launch prices: confirm these with the merchant before enabling orders.
  shipping:200, freeShippingAt:3500, pricesConfirmed:false,
};
export const product = {
  id:'hd-foundation', slug:'hd-liquid-foundation', name:'HD Liquid Foundation',
  vendor:'Glamorous Face', category:'makeup', collection:'The Makeup Edit',
  price:2250, compareAt:2500, image:'/images/foundation-editorial.webp',
  originalImage:'/images/foundation-original.jpg',
  subtitle:'Your everyday base. Your own kind of beautiful.',
  description:'A little finishing touch for your everyday ritual. Explore Glamorous Face HD Liquid Foundation and choose the shade that feels most like you.',
  variants:[{id:'natural',name:'04 Natural',color:'#c99169'}],
  maxQuantity:5,
};
export const collections: {slug:string;name:string;label:string;eyebrow:string;description:string;image?:string}[]=[
  {slug:'makeup',label:'Makeup',name:'The Makeup Edit',eyebrow:'A LITTLE COLOUR. A LOT OF YOU.',description:'The finishing touches that make it yours.',image:'/images/foundation-editorial.webp'},
  {slug:'skincare',label:'Skincare',name:'The Skincare Edit',eyebrow:'SLOW DOWN. GLOW ON.',description:'Make a little room for your daily ritual.',image:'/images/skincare-editorial.webp'},
  ...['Clothing','Bags','Haircare','Nails','Lenses','Personal Care'].map(label=>({slug:label.toLowerCase().replaceAll(' ','-'),label,name:'The '+label+' Edit',eyebrow:'YOUR STYLE. YOUR LITTLE DETAILS.',description:'Discover your next everyday favourites in our '+label.toLowerCase()+' collection.'}))
];
export function money(amount:number){return `Rs. ${amount.toLocaleString('en-PK')}`}
export function totals(quantity:number){const subtotal=product.price*quantity;const shipping=quantity===0||subtotal>=brand.freeShippingAt?0:brand.shipping;return {subtotal,shipping,total:subtotal+shipping}}
