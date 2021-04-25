import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TypeActions } from '../../redux/actions/adminActions';

import { AdminPannelField, Button } from '../AdminPannel';


export default function AdminTypesList() {

    const jwt = useSelector(state => state.auth.authData.token);
    const list = useSelector(state => state.admin.types.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(TypeActions.getList(jwt));
    }, []);


    const selectHandler = (typeId) => {
        dispatch(TypeActions.select(typeId));
    }


    return (
        <div className='AdminTypesList'>
            <AdminPannelField>
                <Button title='Добавить' onClick={() => dispatch(TypeActions.openCreator())} />
            </AdminPannelField>
            <AdminPannelField title='Бренды'>
                {
                    !!list.length
                        ? <table className="AdminPannel__table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Название</th>
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
                                                <td>{new Date(item.createdAt).toLocaleString()}</td>
                                                <td>{new Date(item.updatedAt).toLocaleString()}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        : <p>В базе данных еще нет типов...</p>
                }
            </AdminPannelField>
        </div>
    )
}