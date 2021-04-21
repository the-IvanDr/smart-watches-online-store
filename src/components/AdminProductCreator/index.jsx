import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ProductPhotoSelector from './ProductPhotoSelector';
import MainProductInfo from './MainProductInfo';
import ProductDetails from './ProductDetails';
import DescriptionEditor from './DescriptionEditor';
import SubmitButton from './SubmitButton';


export default function AdminProductCreator() {

    return (
        <div className='AdminProductCreator'>
            <ProductPhotoSelector />
            <MainProductInfo />
            <ProductDetails />
            <DescriptionEditor />
            <SubmitButton />
        </div>
    )
}