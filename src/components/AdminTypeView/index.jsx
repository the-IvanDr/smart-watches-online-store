import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TypeActions } from '../../redux/actions/adminActions';
import { AdminPannelField, AdminPannelViewWrapper, Button, RedButton, ReturnButton, AdminPannelViewItem } from '../AdminPannel';


export default function AdminTypeView() {

    const type = useSelector(state => state.admin.types.list.find(item => item.id === state.admin.types.view));
    const dispatch = useDispatch();


    const returnHandler = () => {
        dispatch(TypeActions.openList());
    }

    const editHandler = () => {
        console.log('edit');
    }

    const removeHandler = () => {
        console.log('remove');
    }


    return (
        <div className='AdminTypeView'>
            <AdminPannelField>
                <ReturnButton onClick={returnHandler} />
                <Button title='Редактировать' onClick={editHandler} />
                <RedButton title='Удалить' onClick={removeHandler} />
            </AdminPannelField>
            <AdminPannelField title='Бренд'>
                <AdminPannelViewWrapper>
                    <AdminPannelViewItem title='ID' value={type.id} />
                    <AdminPannelViewItem title='Название' value={type.name} />
                    <AdminPannelViewItem title='Дата создания' value={new Date(type.createdAt).toLocaleString()} />
                    <AdminPannelViewItem title='Дата последнего редактирования' value={new Date(type.updatedAt).toLocaleString()} />
                </AdminPannelViewWrapper>
            </AdminPannelField>
        </div>
    )
}