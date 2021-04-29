import React, { useEffect, useState } from 'react';
import * as APIQuery from '../../utils/APIQuery';

import Carousel from '../../components/Carousel';
import ProductCard from '../../components/ProductCard';


export default function Novelty(props) {

    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const response = await APIQuery.Products.getNovelty();
        setProducts([...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products,...response.data.products]);
        console.log(response.data.products);
    }, []);


    return (
        <section className='Novelty'>
            <h3 className='Novelty__title'>Новинки</h3>
            <Carousel>
                {products.map(product => {
                    return <ProductCard
                        key={`product-novelty-${product.id}`}
                        name={product.name}
                        img={product.imageSrc}
                        oldPrice={product.discount && (product.price * product.discount) / 100}
                        price={product.price}
                        isNovelty={product.is_novelty}
                    />
                })}
            </Carousel>
        </section>
    )
}