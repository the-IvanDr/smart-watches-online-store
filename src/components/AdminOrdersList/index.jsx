import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { OrderActions } from '../../redux/actions/adminActions';

import { AdminPannelField, Button } from '../AdminPannel';


export default function AdminOrdersList() {

    const jwt = useSelector(state => state.auth.authData.token);
    const list = useSelector(state => state.admin.orders.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(OrderActions.getList(jwt));

    }, []);

    const selectHandler = (productId) => {
        dispatch(OrderActions.openView(productId));
    }


    return (
        <div className="AdminOrdersList">
            <AdminPannelField>
                <Button title='Визуализация данных' onClick={() => dispatch(OrderActions.openCharts())} />
            </AdminPannelField>
            <AdminPannelField title='Товары'>
                {
                    !!list.length
                        ? <table className="AdminPannel__table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Имя клиента</th>
                                    <th>Номер клиента</th>
                                    <th>Адрес доставки</th>
                                    <th>Дата отправки</th>
                                    <th>Дата доставки</th>
                                    <th>Общая цена заказа</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <tr key={`item-${index}-${item.id}`}>
                                                <td className='AdminPannel__table__select-btn' onClick={() => selectHandler(item.id)}>{item.id}</td>
                                                <td>{item.customer_name}</td>
                                                <td>{item.phone_number}</td>
                                                <td>{`г. ${item.city}, ${item.warehouse}`}</td>
                                                <td>{new Date(item.time).toLocaleString()}</td>
                                                <td>{new Date(new Date().setDate(new Date(item.time).getDate() + item.id)).toLocaleString()}</td>
                                                <td>{`${item.total_price} грн`}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : <p>В базе данных еще нет товаров...</p>
                }
            </AdminPannelField>
        </div>
    )
}