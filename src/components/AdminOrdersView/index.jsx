import React from 'react';
import { OrderActions } from '../../redux/actions/adminActions';
import { useSelector, useDispatch } from 'react-redux';

import { AdminPannelField, AdminPannelViewItem, AdminPannelViewWrapper, Button, RedButton, ReturnButton } from '../AdminPannel';


export default function AdminOrdersView() {

    const jwt = useSelector(state => state.auth.authData.token);
    const order = useSelector(state => state.admin.orders.list.find(item => item.id === state.admin.orders.view));
    const dispatch = useDispatch();

    const returnHandler = () => {
        dispatch(OrderActions.openList());
    }

    return (
        <div className='AdminOrdersView'>
            <AdminPannelField>
                <ReturnButton onClick={returnHandler} />
                <Button title='Редактировать' />
                <RedButton title='Удалить' />
            </AdminPannelField>
            <AdminPannelField title={`Заказ #${order.id}`}>
                <AdminPannelViewWrapper>
                    <AdminPannelViewItem title='Имя клиента' value={order.customer_name} />
                    <AdminPannelViewItem title='Телефон' value={order.phone_number} />
                    <AdminPannelViewItem title='Город' value={order.city} />
                    <AdminPannelViewItem title='Адрес' value={order.warehouse} />
                    <AdminPannelViewItem title='Цена заказа' value={`${new Intl.NumberFormat('ru-RU').format(order.total_price)} грн`} />
                    <AdminPannelViewItem title='Способ доставки' value={order.deliveryMethod} />
                    <AdminPannelViewItem title='Способ оплаты' value={order.paymentMethod} />
                    <AdminPannelViewItem title='Дата отправки' value={new Date(order.time).toLocaleString()} />
                    <AdminPannelViewItem title='Дата доставки' value={new Date(new Date().setDate(new Date(order.time).getDate() + order.id)).toLocaleString()} />

                    <AdminPannelViewItem title='Состав заказа' />

                    {
                        order.products.map((product, index) => {
                            return (
                                <AdminPannelField title={`#${index + 1}: ${product.name}`} >
                                    <AdminPannelViewWrapper>
                                        <AdminPannelViewItem imgSrc={product.imageSrc} />
                                        <AdminPannelViewItem title='Название' value={product.name} />
                                        <AdminPannelViewItem title='Артикул' value={product.article} />
                                        <AdminPannelViewItem title='Цена' value={`${new Intl.NumberFormat('ru-RU').format(product.price)} грн`} />
                                        <AdminPannelViewItem title='Кол-во' value={product.amount} />

                                    </AdminPannelViewWrapper>
                                </AdminPannelField>

                            )
                        })
                    }




                </AdminPannelViewWrapper>
            </AdminPannelField>
        </div>
    )
}