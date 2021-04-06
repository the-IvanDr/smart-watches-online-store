import React from 'react';

import Header from '../../src/sections/Header';
import ProductProfile from '../../src/sections/ProductProfile';
import ViewedProducts from './../../src/sections/ViewedProducts/index';
import Footer from './../../src/sections/Footer/index';


export default function Product(){
    return (
        <div className='Product'>
            <Header />
            
            <ProductProfile />
            <ViewedProducts />
            <Footer />
        </div>
    )
}