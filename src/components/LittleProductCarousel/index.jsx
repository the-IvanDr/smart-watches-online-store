import React, { useEffect, useRef } from 'react';

import Carousel from '../Carousel/index';
import ProductCard from '../ProductCard/index';


export default function LittleProductCarousel({ ElementsCountToShow, products }) {
    const blockRef = useRef();

    useEffect(() => {
        const $productCards = blockRef.current.querySelectorAll('.ProductCard');

        $productCards.forEach(item => {
            item.style.minWidth = 100 / ElementsCountToShow - 1.9 + '%';
            item.style.width = 100 / ElementsCountToShow - 1.9 + '%';
        });

    }, [products])

    return (
        <div className='LittleProductCarousel' ref={blockRef}>
            <Carousel amountShowedElems={ElementsCountToShow}>
                {products && products.map(product => {
                    return <ProductCard
                        key={`product-hit-${product.id}`}
                        name={product.name}
                        img={product.imageSrc}
                        oldPrice={product.discount && (product.price * product.discount) / 100}
                        price={product.price}
                        isNovelty={product.is_novelty}
                        productId={product.id}
                    />
                })}
            </Carousel>
        </div>
    )
}