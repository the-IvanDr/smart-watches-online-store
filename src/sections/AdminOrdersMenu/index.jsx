import React from 'react';
import { useSelector } from 'react-redux';

import AdminOrdersList from './../../components/AdminOrdersList/index';
import AdminOrdersView from './../../components/AdminOrdersView/index';
import AdminOrdersCharts from '../../components/AdminOrdersCharts';

export default function AdminOrdersMenu() {

    const tabs = useSelector(state => state.admin.orders.tabs);

    return (
        <div className='AdminOrdersMenu'>
            {tabs.list && <AdminOrdersList />}
            {tabs.view && <AdminOrdersView />}
            {tabs.charts && <AdminOrdersCharts />}
        </div>
    )
}