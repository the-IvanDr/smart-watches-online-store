import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import GoUp from './../../src/components/GoUp/index';
import AdminHeader from '../../src/sections/AdminHeader';
import AdminProductsMenu from './../../src/sections/AdminProductsMenu/index';
import AdminBrandsMenu from '../../src/sections/AdminBrandsMenu/AdminBrandsMenu';
import AdminTypesMenu from '../../src/sections/AdminTypesMenu';
import AdminOrdersMenu from '../../src/sections/AdminOrdersMenu';


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
            <GoUp />
            
            <AdminHeader />
            {tabs.users && "USERS MENU"}
            {tabs.products && <AdminProductsMenu />}
            {tabs.orders && <AdminOrdersMenu />}
            {tabs.brands && <AdminBrandsMenu />}
            {tabs.types && <AdminTypesMenu />}
        </div>
    )
}