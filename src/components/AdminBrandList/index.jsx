import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrandActions } from './../../redux/actions/adminActions';

import { AdminPannelField, Button } from '../AdminPannel';

export default function AdminBrandList() {

    const jwt = useSelector(state => state.auth.authData.token);
    const list = useSelector(state => state.admin.brands.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(BrandActions.getList(jwt));
    }, []);

    const selectHandler = (brandId) => {
        dispatch(BrandActions.select(brandId));
    }

    return (
        <div className='AdminBrandList'>
            <AdminPannelField>
                <Button title='Добавить' onClick={() => dispatch(BrandActions.openCreator())} />
            </AdminPannelField>
            <AdminPannelField title='Бренды'>
                {
                    !!list.length
                        ? <table className="AdminPannel__table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
                                    <th>Логотип</th>
                                    <th>Дата создания</th>
                                    <th>Дата редактирования</th>
                                    {/* <th>Ред.</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.map((item, index) => {
                                        return (
                                            <tr key={`item-${index}-${item.id}`}>
                                                <td>{item.id}</td>
                                                <td className='AdminPannel__table__select-btn' onClick={() => selectHandler(item.id)}>{item.name}</td>
                                                <td><a target='_blank' href={item.logoSrc}>{item.logoSrc}</a></td>
                                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                                                <td>{new Date(item.updatedAt).toLocaleString()}</td>

                                                {/* <td className='AdminPannel__table__edit-btn'><i className="fa fa-pencil-square-o" aria-hidden="true" /></td> */}
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : <p>В базе данных еще нет брендов...</p>
                }
            </AdminPannelField>
        </div>
    )
}