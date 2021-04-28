import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from '../../redux/actions/adminActions';

import { AdminPannelField, AdminInputWrapper, AdminInputRowGroup, AdminSelectorWrapper, AdminCheckboxListWrapper, AdminCheckboxWrapper } from '../AdminPannel';

export default function MainProductInfo() {

    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ProductActions.getTypesAndBrands(jwt));

    }, []);


    const inputsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        dispatch(ProductActions.changeInputs(fieldName, fieldValue));
    }

    const selectorsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const selectedIndex = event.target.options.selectedIndex;
        const fieldValue = [...form[fieldName]];
        fieldValue.forEach((item, index) => {
            if (index === selectedIndex) item.active = true;
            else item.active = false;
        });

        dispatch(ProductActions.changeInputs(fieldName, fieldValue));
    }


    return (
        <AdminPannelField title='Основное'>

            <AdminInputWrapper title='Название' type='text' name='title' value={form.title} onChange={inputsChangeHandler} />

            <AdminInputRowGroup>
                <AdminInputWrapper title='Цена (грн)' type='number' name='price' value={form.price} onChange={inputsChangeHandler} />
                <AdminInputWrapper title='Скидка %' type='number' name='discount' value={form.discount} onChange={inputsChangeHandler} />
            </AdminInputRowGroup>

            <AdminInputRowGroup>

                <AdminSelectorWrapper title='Характер' name='character'
                    selectArrOfObj={form.character} onChange={selectorsChangeHandler} />

                <AdminSelectorWrapper title='Тип' name='types'
                    selectArrOfObj={form.types} onChange={selectorsChangeHandler} />

                <AdminSelectorWrapper title='Бренд' name='brands'
                    selectArrOfObj={form.brands} onChange={selectorsChangeHandler} />

            </AdminInputRowGroup>

            <AdminCheckboxListWrapper title='Маркеры'>
                <AdminCheckboxWrapper title='Хит' name='isHit' checked={form.isHit} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Новинка' name='isNovelty' checked={form.isNovelty} onChange={inputsChangeHandler} />
            </AdminCheckboxListWrapper>

            <AdminInputWrapper title='Артикул' type='text' name='article' value={form.article} onChange={inputsChangeHandler} />

        </AdminPannelField>
    )
}