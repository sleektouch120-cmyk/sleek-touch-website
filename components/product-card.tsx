'use client';
import type {Product} from '@/lib/products';
import Link from 'next/link';
import {useStore} from './store-provider';
import {money} from '@/lib/catalog';
import {Plus,ArrowUpRight} from './icons';
export default function ProductCard({editorial=false,product:provided}:{editorial?:boolean;product?:Product}){const {add,products}=useStore();const product=provided||products[0];if(!product)return null;return <article className={`product-card ${editorial?'product-card-featured':''}`}><Link href={`/products/${product.slug}`} className="product-card-image"><img src={product.image} alt={product.name} width={700} height={800} loading="lazy"/>{product.compareAt>product.price&&<span className="sale-badge">SAVE {Math.round((1-product.price/product.compareAt)*100)}%</span>}<span className="product-image-arrow"><ArrowUpRight size={20}/></span></Link><div className="product-card-info"><span className="eyebrow">{product.vendor}</span><Link href={`/products/${product.slug}`}><h3>{product.name}</h3></Link><p>Your everyday, beautifully finished.</p><div className="product-card-bottom"><div><b>{money(product.price)}</b>{product.compareAt>product.price&&<s>{money(product.compareAt)}</s>}</div><button aria-label={`Add ${product.name} to cart`} onClick={()=>add(product.id)}><span>Add to cart</span><Plus size={17}/></button></div></div></article>}
