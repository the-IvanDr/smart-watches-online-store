import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from '../../redux/actions/adminActions';

import { AdminPannelField, Button } from '../AdminPannel';


export default function AdminProductList() {

    const jwt = useSelector(state => state.auth.authData.token);
    const list = useSelector(state => state.admin.products.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProductActions.getList(jwt));
    }, []);

    const selectHandler = (productId) => {
        dispatch(ProductActions.openView(productId));
    }


    return (
        <div className='AdminProductList'>
            <AdminPannelField>
                <Button title='Добавить' onClick={() => dispatch(ProductActions.openCreator())} />
            </AdminPannelField>
            <AdminPannelField title='Товары'>
                {
                    !!list.length
                        ? <table className="AdminPannel__table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Артикул</th>
                                    <th>Цена</th>
                                    <th>Метка</th>
                                    <th>Характер</th>
                                    <th>Бренд</th>
                                    <th>Тип</th>
                                    <th>Дата создания</th>
                                    <th>Дата редактирования</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <tr key={`item-${index}-${item.id}`}>
                                                <td>{item.id}</td>
                                                <td className='AdminPannel__table__select-btn' onClick={() => selectHandler(item.id)}>{item.name}</td>
                                                <td>{item.article}</td>
                                                <td>{item.price}</td>
                                                <td>
                                                    {
                                                        (item.is_hit && item.is_novelty && 'Хит / Новинка')
                                                        || (item.is_hit && 'Хит')
                                                        || (item.is_novelty && 'Новинка')
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        (item.is_for_man && item.is_for_woman && 'Унисекс')
                                                        || (item.is_for_woman && 'Женский')
                                                        || (item.is_for_man && 'Мужской')
                                                        || (item.is_for_kids && 'Детский')
                                                    }
                                                </td>
                                                <td>{item.brand.name}</td>
                                                <td>{item.type.name}</td>
                                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                                                <td>{new Date(item.updatedAt).toLocaleString()}</td>
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