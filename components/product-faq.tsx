import Link from 'next/link';
import {ChevronDown} from './icons';

export default function ProductFaq(){return <section className="product-faq" aria-labelledby="product-faq-title">
  <span className="eyebrow pink">A LITTLE HELP BEFORE YOU SHOP</span>
  <h2 id="product-faq-title">Frequently asked questions</h2>
  <div className="product-disclosures">
    <details><summary>How do I place an order?<ChevronDown size={16}/></summary><p>Choose an available option on the product page, select your quantity, and tap Add to cart or Buy now. At checkout, enter your name, mobile number, and full delivery address. Checkout will show whether the selected products are ready to order.</p></details>
    <details><summary>Can I pay cash on delivery?<ChevronDown size={16}/></summary><p>Cash on delivery is available for orderable products in Pakistan. You can pay the total shown at checkout when your parcel arrives. See our <Link href="/shipping">delivery and payment information</Link> for details.</p></details>
    <details><summary>How much is delivery and how long does it take?<ChevronDown size={16}/></summary><p>Your delivery charge is shown at checkout before you confirm. Coverage and estimated dispatch times will be confirmed before ordering opens. <Link href="/contact">Contact us</Link> with your city for delivery questions.</p></details>
    <details><summary>How do I choose a size, shade, or option?<ChevronDown size={16}/></summary><p>Check the options, photographs, and any size or shade guide provided on the product page. Colours may look different on different screens. If you are unsure, contact us before ordering so we can help with the available product details.</p></details>
    <details><summary>Can I return or exchange an item?<ChevronDown size={16}/></summary><p>Please contact us with your order number before sending anything back. For damaged or incorrect items, keep the packaging and take clear photographs. Read our <Link href="/returns">return and exchange policy</Link> for the latest eligibility and instructions.</p></details>
    <details><summary>How can I ask about or change my order?<ChevronDown size={16}/></summary><p>Contact us by phone, WhatsApp, or email using our <Link href="/contact">contact page</Link>. Include your order reference if you have one. For changes or cancellations, get in touch as soon as possible; we will confirm what is possible based on the order status.</p></details>
  </div>
</section>}
