import Checkout from '@/components/checkout';
import {checkoutConfigured} from '@/lib/order-service';
export const dynamic='force-dynamic';
export const metadata={title:'Cash on delivery checkout',robots:{index:false,follow:false}};
export default function CheckoutPage(){return <Checkout enabled={checkoutConfigured()}/>}
