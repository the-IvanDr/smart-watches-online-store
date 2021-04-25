import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrandActions } from './../../redux/actions/adminActions';

import { AdminPannelField, AdminPannelViewItem, AdminPannelViewWrapper, ReturnButton, RedButton, Button } from '../AdminPannel';


export default function AdminBrandView() {

    const brand = useSelector(state => state.admin.brands.list.find(item => item.id === state.admin.brands.view));
    const dispatch = useDispatch();


    const returnHandler = () => {
        dispatch(BrandActions.openList());
    }

    const editHandler = () => {
        console.log('edit');
    }

    const removeHandler = () => {
        console.log('remove');
    }

    return (
        <div className='AdminBrandView'>
            <AdminPannelField>
                <ReturnButton onClick={returnHandler} />
                <Button title='Редактировать' onClick={editHandler} />
                <RedButton title='Удалить' onClick={removeHandler} />
            </AdminPannelField>
            <AdminPannelField title='Бренд'>
                <AdminPannelViewWrapper>
                    <AdminPannelViewItem title='Логотип' imgSrc={brand.logoSrc} />
                    <AdminPannelViewItem title='ID' value={brand.id} />
                    <AdminPannelViewItem title='Название' value={brand.name} />
                    <AdminPannelViewItem title='Дата создания' value={new Date(brand.createdAt).toUTCString()} />
                    <AdminPannelViewItem title='Дата последнего редактирования' value={new Date(brand.updatedAt).toUTCString()} />

                </AdminPannelViewWrapper>
            </AdminPannelField>
        </div>
    )
}