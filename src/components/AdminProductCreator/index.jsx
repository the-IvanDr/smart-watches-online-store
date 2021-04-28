import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from '../../redux/actions/adminActions';

import ProductPhotoSelector from './ProductPhotoSelector';
import MainProductInfo from './MainProductInfo';
import ProductDetails from './ProductDetails';
import DescriptionEditor from './DescriptionEditor';
import { AdminPannelField, SubmitButton, ReturnButton } from '../AdminPannel';


export default function AdminProductCreator() {

    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(ProductActions.create(jwt, form));
    }

    return (
        <div className='AdminProductCreator'>
            <AdminPannelField>
                <ReturnButton onClick={() => dispatch(ProductActions.openList())} />
            </AdminPannelField>
            <ProductPhotoSelector />
            <MainProductInfo />
            <ProductDetails />
            <DescriptionEditor />
            
            <AdminPannelField>
                <SubmitButton title='Отправить' onClick={submitHandler} />
            </AdminPannelField>
        </div>
    )
}