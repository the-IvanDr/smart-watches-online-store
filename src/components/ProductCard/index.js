import React, { useState } from 'react';
import clsx from 'clsx';

export default function ProductCard({ img, oldPrice }) {
    const [isFocused, setIsFocused] = useState(false);

    return (
        <div
            onMouseEnter={() => setIsFocused(true)}
            onMouseLeave={() => setIsFocused(false)}
            className={clsx('ProductCard', isFocused && 'ProductCard_on-focus')}
        >
            <a className='ProductCard__image' href='/'>
                <img src={img} alt='product' />
                <span className='ProductCard__novelty'>Новинка</span>
            </a>
            <a className='ProductCard__name' href='/'>Смарт-часы XIAOMI Amazfit Verge Blue</a>
            <span className='ProductCard__price'>3 599 грн {oldPrice && <span>{oldPrice} грн</span>}</span>
            <div className='ProductCard__hiden'>
                <a href='/'>Купить</a>
                <span className='ProductCard__hiden__heart checked'><span><i aria-hidden className="far fa-heart" /></span></span>
            </div>
        </div>
    )
}