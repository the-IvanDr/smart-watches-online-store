import React, { useEffect } from 'react';

import Carousel from './../Carousel/index';
import ProductCard from './../ProductCard/index';


export default function LittleProductCarousel({ ElementsCountToShow }) {

    useEffect(() => {
        const $productCards = document.querySelectorAll('.ProductCard');

        $productCards.forEach(item => {
            item.style.minWidth = 100/ElementsCountToShow-1.9 + '%';
            item.style.width = 100/ElementsCountToShow-1.9 + '%';
        });
        
    }, [])

    return (
        <div className='LittleProductCarousel'>
            <Carousel amountShowedElems={ElementsCountToShow}>
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
                <ProductCard
                    img='../assets/images/products/amazfit__verge.jpg'
                />
            </Carousel>
        </div>
    )
}