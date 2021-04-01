import React from 'react';

import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';


export default function ViewedProducts() {
    const AMOUNT_OF_ELEMENTS_TO_SHOW = 8;

    return (
        <div className='ViewedProducts'>
            <div className='ViewedProducts__title'>Просмотренные товары</div>
            <div className='ViewedProducts__wrapp'>
                <Carousel amountShowedElems={AMOUNT_OF_ELEMENTS_TO_SHOW}>
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                    <ProductCard
                        img='./assets/images/products/amazfit__verge.jpg'
                    />
                </Carousel>
            </div>
        </div>
    )
}