import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import AdminHeader from '../../src/sections/AdminHeader';
import AdminProductsMenu from './../../src/sections/AdminProductsMenu/index';


const isBrowser = typeof window !== 'undefined';

export default function AdminPannel() {
    // Check an access to AdminPannel
    const router = useRouter();
    const role = useSelector(state => state.auth.authData.role);
    if (isBrowser && role !== 'ADMIN') {
        console.log('No acces to /administrator');
        router.push('/');
        return <div>No access</div>;
    }

    const tabs = useSelector(state => state.admin.header.tabs);





    return (
        <div>
            <AdminHeader />
            {tabs.users && "USERS MENU"}
            {tabs.products && <AdminProductsMenu />}
            {tabs.orders && 'ORDERS MENU'}
            {tabs.brands && 'BRANDS MENU'}
            {tabs.types && 'TYPES MENU'}
        </div>
    )
}