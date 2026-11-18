import {notFound} from 'next/navigation';
import {getProducts} from '@/lib/store-data';
import ProductDetail from '@/components/product-detail';
import ProductFaq from '@/components/product-faq';
export const dynamic='force-dynamic';
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=(await getProducts()).find(p=>p.slug===slug);return {title:product?.name||'Product not found'}}
export default async function ProductPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const product=(await getProducts()).find(p=>p.slug===slug);if(!product)notFound();return <><ProductDetail product={product}/><ProductFaq/></>}
