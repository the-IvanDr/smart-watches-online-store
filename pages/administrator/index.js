import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import AdminHeader from '../../src/sections/AdminHeader';


const isBrowser = typeof window !== 'undefined';

export default function AdministratorLoginPage() {
    const router = useRouter();
    const role = useSelector(state => state.auth.authData.role);
    if (isBrowser && role !== 'ADMIN') {
        console.log('No acces to /administrator');
        router.push('/');
        return <div>No access</div>;
    }

    return (
        <div>
            <AdminHeader />
        </div>
    )
}