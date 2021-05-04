import React, { useState, useEffect } from 'react';
import * as APIQuery from '../../utils/APIQuery';

import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';


export default function Hits(props) {

    const [products, setProducts] = useState([]);

    useEffect(async () => {
        const response = await APIQuery.Products.getHits();
        setProducts([...response.data.products, ...response.data.products, ...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products]);
    }, []);


    return (
        <section className='Hits'>
            <h3 className='Hits__title'>Хиты продаж</h3>
            <Carousel>
                {products.map(product => {
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
        </section>
    )
}