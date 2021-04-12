import React from 'react';

import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';


export default function Hits(props) {
    return (
        <section className='Hits'>
            <h3 className='Hits__title'>Хиты продаж</h3>
            <Carousel>
                <ProductCard
                    img='./assets/images/products/amazfit__verge.jpg'
                    oldPrice='5 500'
                />
                <ProductCard
                    img='./assets/images/products/garmin_forerunner235.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
                <ProductCard
                    img='./assets/images/products/samsung_galaxy_silver.jpg'
                />
            </Carousel>
        </section>
    )
}