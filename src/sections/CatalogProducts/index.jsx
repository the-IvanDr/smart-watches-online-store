import React, { useState, useEffect } from 'react';
import * as APIQuery from '../../utils/APIQuery';

import ProductCard from '../../components/ProductCard';
import { useDispatch, useSelector } from 'react-redux';
import { changeField } from '../../redux/actions/filterActions';

import Filter from '../Filter';


export default function CatalogProducts({ character, accessories }) {

    const [products, setProducts] = useState([]);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    useEffect(() => {
        if (accessories) dispatch(changeField('typeId', 2));
        else dispatch(changeField('typeId', 1));
        dispatch(changeField('character', character));

    }, []);


    useEffect(async () => {
        const response = await APIQuery.Products.getByFilter(filter);
        setProducts(response.data.products);
    }, [filter]);


    return (
        <>
            {!accessories && <Filter />}
            <div className='CatalogProducts'>
                {products.map(product => {
                    return <ProductCard
                        key={`product-${product.id}`}
                        name={product.name}
                        img={product.imageSrc}
                        oldPrice={product.discount && (product.price * product.discount) / 100}
                        price={product.price}
                        isNovelty={product.is_novelty}
                        productId={product.id}
                    />
                })}
            </div>
        </>
    )
}