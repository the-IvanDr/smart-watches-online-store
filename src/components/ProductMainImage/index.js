import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';


export default function ProductMainImage() {
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
                    Смарт-часы HUAWEI Watch GT Classic
                    <button onClick={() => setIsModalImageActive(false)}><i className="fas fa-times" aria-hidden="true" /></button>
                </div>
                <div className='ModalImage__image'>
                    <img src='../assets/images/products/amazfit__verge.jpeg' alt='amazfit-verge' />
                </div>
            </div>
            {/* ======================== MODAL END ======================== */}

            {/* ======================== MAIN BLOCK START ======================== */}
            <div className='ProductMainImage'>
                <img
                    onClick={() => setIsModalImageActive(true)}
                    className='ProductMainImage__image'
                    src='../assets/images/products/amazfit__verge.jpeg' alt='amazfit-verge'
                />

                <Link href='/'>
                    <a className='ProductMainImage__brand-icon'>
                        <img src='../assets/images/brands/amazfit.png' alt='amazfit' />
                    </a>
                </Link>

                <span className='ProductMainImage__marker'>
                    Новинка
                </span>
            </div>
            {/* ======================== MAIN BLOCK END ======================== */}

        </>
    )
}