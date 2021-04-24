import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductPhotoSelector from './ProductPhotoSelector';
import MainProductInfo from './MainProductInfo';
import ProductDetails from './ProductDetails';
import DescriptionEditor from './DescriptionEditor';
import { AdminPannelField, SubmitButton } from '../AdminPannel';



export default function AdminProductCreator() {

    const submitHandler = () => {
        console.log('submitHandler');
    }

    return (
        <div className='AdminProductCreator'>
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