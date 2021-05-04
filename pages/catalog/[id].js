import React from 'react';
import * as APIQuery from '../../src/utils/APIQuery';

import Header from '../../src/sections/Header';
import ProductProfile from '../../src/sections/ProductProfile';
import ViewedProducts from './../../src/sections/ViewedProducts/index';
import Footer from './../../src/sections/Footer/index';
import GoUp from './../../src/components/GoUp/index';


export default function Product({ product }) {


    console.log('product', product);

    return (
        <div className='Product'>
            <Header />

            <GoUp />
            <ProductProfile product={product} />
            <ViewedProducts />
            <Footer />
        </div>
    )
}

export async function getServerSideProps(context) {

    const productId = context.params.id;
    const response = await APIQuery.Products.getById(productId);
    const product = response.data.product;

    return {
        props: { product }
    }
}