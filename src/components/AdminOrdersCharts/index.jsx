import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../redux/actions/adminActions';

import { AdminPannelField, AdminPannelViewItem, AdminPannelViewWrapper, Button, RedButton, ReturnButton } from '../AdminPannel';


// Графики, гистограммы, диаграммы:
// Уровень продаж по городам. Откуда чаще заказы
// Продажи за месяц
// Самый большой чек за месяц


export default function AdminOrdersCharts() {

    const orders = useSelector(state => state.admin.orders.list);

    useEffect(() => {
        console.log('Визуализация данных:', orders);
    })

    const dispatch = useDispatch();

    return (
        <div className='AdminOrdersCharts'>
            <AdminPannelField>
                <ReturnButton onClick={() => dispatch(OrderActions.openList())} />
            </AdminPannelField>
            <AdminPannelField title='Визуализация данных'>

            </AdminPannelField>
        </div>
    )
}