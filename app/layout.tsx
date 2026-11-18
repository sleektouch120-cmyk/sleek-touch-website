import TikTokPixel from '@/components/tiktok-pixel';
import {getProducts} from '@/lib/store-data';
import type {Metadata} from 'next';
import {StoreProvider} from '@/components/store-provider';
import Header from '@/components/header';
import Footer from '@/components/footer';
import './globals.css';
export const metadata:Metadata={title:{default:'Sleek Touch — Your everyday, a little more beautiful.',template:'%s | Sleek Touch'},description:'Discover your everyday beauty edit. Thoughtfully selected makeup and skincare, with cash on delivery in Pakistan.'};
export const dynamic='force-dynamic';
export default async function RootLayout({children}:{children:React.ReactNode}){const products=await getProducts();return <html lang="en" data-scroll-behavior="smooth"><body><a className="skip-link" href="#main-content">Skip to content</a><StoreProvider products={products}><Header/><main id="main-content">{children}</main><Footer/></StoreProvider><TikTokPixel/></body></html>}
