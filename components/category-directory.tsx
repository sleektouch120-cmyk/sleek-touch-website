import Link from 'next/link';
import {Shirt,Scissors,Eye,Paintbrush,ShoppingBag,Sparkles,Leaf,Heart} from 'lucide-react';
import {collections} from '@/lib/catalog';
const icons=[Sparkles,Leaf,Shirt,ShoppingBag,Scissors,Paintbrush,Eye,Heart];
export default function CategoryDirectory(){return <section className="section category-directory" id="categories"><div className="section-heading"><div><span className="eyebrow pink">THE SLEEK TOUCH EDITS</span><h2>Every side of you. <em>Find your favourites.</em></h2></div></div><nav className="category-directory-grid" aria-label="Browse categories">{collections.map((c,i)=>{const Icon=icons[i];return <Link key={c.slug} href={`/collections/${c.slug}`}><span><Icon size={30} strokeWidth={1.3} aria-hidden="true"/></span><strong>{c.label}</strong><small>Explore the edit</small></Link>})}</nav></section>}
