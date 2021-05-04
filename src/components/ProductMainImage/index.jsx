import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';


export default function ProductMainImage({ product }) {
    const [isModalImageActive, setIsModalImageActive] = useState(false);

    // If isModalImageActive is TRUE - hide the scroll bar
    useEffect(() => {
        isModalImageActive
            ? document.body.style.overflow = 'hidden'
            : document.body.style.overflow = 'auto';

    }, [isModalImageActive]);



    return (
        <>
            {/* ======================== MODAL START ======================== */}
            <div className={clsx('ModalImage', isModalImageActive && 'active')}>
                <div className='ModalImage__title'>
                    {product.name}
                    <button onClick={() => setIsModalImageActive(false)}><i className="fas fa-times" aria-hidden="true" /></button>
                </div>
                <div className='ModalImage__image'>
                    <img src={product.imageSrc} alt={product.name} />
                </div>
            </div>
            {/* ======================== MODAL END ======================== */}

            {/* ======================== MAIN BLOCK START ======================== */}
            <div className='ProductMainImage'>
                <img
                    onClick={() => setIsModalImageActive(true)}
                    className='ProductMainImage__image'
                    src={product.imageSrc} alt={product.name}
                />

                <Link href='/'>
                    <a className='ProductMainImage__brand-icon'>
                        <img src={product.brand.logoSrc} alt={product.brand.name} />
                    </a>
                </Link>

                <span className='ProductMainImage__marker'>
                    {
                        (product.is_hit && product.is_novelty && "Хит / Новинка")
                        || (product.is_hit && 'Хит')
                        || (product.is_novelty && 'Новинка')
                    }
                </span>
            </div>
            {/* ======================== MAIN BLOCK END ======================== */}

        </>
    )
}