import React, { useState, useRef, useEffect } from 'react';

import ProductMainImage from '../../components/ProductMainImage';
import Breadcrumbs from './../../components/Breadcrumbs/index';

import LittleProductCarousel from '../../components/LittleProductCarousel';
import FeedbackSection from './FeedbackSection';
import Tabs from './Tabs';
import ProductDescription from './ProductDescription';


export default function ProductProfile() {

    const OtherProducts = () => (
        <>
            <div className='ProductProfile__similar-products'>
                <div className='ProductProfile__section-title'>Смотрите также</div>
                <LittleProductCarousel ElementsCountToShow={4} />
            </div>

            <div className='ProductProfile__similar-products'>
                <div className='ProductProfile__section-title'>Похожие товары</div>
                <LittleProductCarousel ElementsCountToShow={4} />
            </div>
        </>
    );

    return (
        <div className='ProductProfile'>
            <div className='ProductProfile__flex-wrap'>
                {/* ========================== LEFT SIDE START =========================== */}
                <div className='ProductProfile__flex-wrap__left'>
                    <div className='ProductProfile__flex-wrap__left__wrap'>
                        <ProductMainImage />
                        <FeedbackSection />
                    </div>
                </div>
                {/* ========================== LEFT SIDE END =========================== */}

                {/* ========================== RIGHT SIDE START =========================== */}
                <div className='ProductProfile__flex-wrap__right'>
                    <div className='ProductProfile__flex-wrap__right__wrap'>
                        <Breadcrumbs />

                        <h3 className='ProductProfile__title'>Смарт-часы XIAOMI Amazfit Verge Blue</h3>

                        <div className='ProductProfile__under-title-markers'>
                            <span className='ProductProfile__under-title-markers__availability -in-stock'>В наличии</span>
                            <span className='ProductProfile__under-title-markers__article'>Артикул: eef3f3</span>
                            <a href='#new-feedback' className='ProductProfile__under-title-markers__write-feedback'>Оставить отзыв</a>
                        </div>

                        <div className='ProductProfile__price-wrap'>
                            <div className='ProductProfile__price'>3 599 грн</div>
                            <button className='ProductProfile__add-to-desired'>
                                <span><i className="fa fa-heart-o" aria-hidden="true" /></span>
                                В желания
                            </button>
                        </div>

                        <div className='ProductProfile__main-buttons'>
                            <button className='ProductProfile__buy-button'>Купить</button>
                            <button className='ProductProfile__fast-order-button'>Быстрый заказ</button>
                        </div>

                        <Tabs />
                        <OtherProducts />
                    </div>

                </div>
                {/* ========================== RIGHT SIDE END =========================== */}

            </div>

            {/* ========================== PART FOR SMALL WIDHT SCREEN START =========================== */}
            <div className='ProductProfile__adapt'>
                <div className='ProductProfile__adapt__title'>
                    <Breadcrumbs />
                    <h3 className='ProductProfile__title'>Смарт-часы XIAOMI Amazfit Verge Blue</h3>
                    <div className='ProductProfile__under-title-markers'>
                        <span className='ProductProfile__under-title-markers__availability -in-stock'>В наличии</span>
                        <span className='ProductProfile__under-title-markers__article'>Артикул: eef3f3</span>
                        <a href='#newfeedbackadapt' className='ProductProfile__under-title-markers__write-feedback'>Оставить отзыв</a>
                    </div>
                </div>

                <div className='ProductProfile__adapt__flex-wrapper'>
                    <ProductMainImage />
                    <div className='ProductProfile__adapt__deal-table'>
                        <div className='ProductProfile__price'>3 599 грн</div>
                        <div className='ProductProfile__main-buttons'>
                            <button className='ProductProfile__buy-button'>Купить</button>
                            <button className='ProductProfile__fast-order-button'>Быстрый заказ</button>
                        </div>
                        <button className='ProductProfile__add-to-desired'>
                            <span><i className="fa fa-heart-o" aria-hidden="true" /></span>
                            В желания
                        </button>
                    </div>
                </div>
            </div>
            {/* ========================== PART FOR SMALL WIDHT SCREEN END =========================== */}

            <ProductDescription />

            {/* ========================== PART FOR SMALL WIDHT SCREEN START =========================== */}
            <div className='ProductProfile__adapt'>
                <FeedbackSection />
                <Tabs />
                <OtherProducts />
            </div>
            {/* ========================== PART FOR SMALL WIDHT SCREEN END =========================== */}


        </div>
    )
}