import {isAdmin} from '@/lib/admin-auth';
import {storageConfigured} from '@/lib/store-data';
import Dashboard from '@/components/dashboard';
export const dynamic='force-dynamic';
export const metadata={title:'Shop dashboard',robots:{index:false,follow:false}};
export default async function Admin(){return <Dashboard authenticated={await isAdmin()} configured={storageConfigured()&&Boolean(process.env.ADMIN_PASSWORD_HASH&&process.env.ADMIN_SESSION_SECRET)}/>}
