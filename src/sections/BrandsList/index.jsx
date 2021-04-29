import React, { useState, useEffect } from 'react'

import * as APIQuery from '../../utils/APIQuery';

export default function BrandsList(props) {

    const [brands, setBrands] = useState([]);

    useEffect(async () => {
        const response = await APIQuery.Brands.getList();
        setBrands(response.data.brands);
    }, []);


    return (
        <section className='BrandsList' onClick={() => console.log(brands)}>
            <h3 className='BrandsList__title'>Бренды</h3>

            <div className='BrandsList__slider'>
                <ul>
                    {brands.map(brand => {
                        return (
                            <li key={`brand-${brand.id}`}>
                                <a href='/'>
                                    <img src={brand.logoSrc} alt={brand.name} />
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </section>
    )
}

