import React from 'react';
import { AdminPannelField } from '../../components/AdminPannel';

export default function AdminBrandsMenu() {
    return (
        <div className='AdminBrandsMenu'>
            <AdminPannelField title='Бренды'>
                {'<...>'}
            </AdminPannelField>
        </div>
    )
}