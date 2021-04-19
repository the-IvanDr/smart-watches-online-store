import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MainProductInfo from './MainProductInfo';

import ProductPhotoSelector from './ProductPhotoSelector';


export default function AdminProductCreator() {    

    return (
        <div className='AdminProductCreator'>
            <ProductPhotoSelector />
            <MainProductInfo />
        </div>
    )
}