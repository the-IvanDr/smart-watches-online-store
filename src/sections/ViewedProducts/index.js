import React from 'react';

import Carousel from '../../components/Carousel';
import LittleProductCarousel from '../../components/LittleProductCarousel';
import ProductCard from '../../components/ProductCard';


export default function ViewedProducts() {
    const AMOUNT_OF_ELEMENTS_TO_SHOW = 8;

    return (
        <div className='ViewedProducts'>
            <div className='ViewedProducts__title'>Просмотренные товары</div>
            <div className='ViewedProducts__wrapp'>
                <LittleProductCarousel ElementsCountToShow={AMOUNT_OF_ELEMENTS_TO_SHOW} />
            </div>
        </div>
    )
}