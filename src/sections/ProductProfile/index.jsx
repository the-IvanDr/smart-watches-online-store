import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import ProductMainImage from '../../components/ProductMainImage';
import Feedback from '../../components/Feedback';
import FeedbackCreator from '../../components/FeedBackCreator';
import Breadcrumbs from './../../components/Breadcrumbs/index';

import ViewedProducts from '../ViewedProducts';
import LittleProductCarousel from '../../components/LittleProductCarousel';


export default function ProductProfile() {
    const [tabs, setTabs] = useState([
        {
            active: true,
            elem: useRef()
        },
        {
            active: false,
            elem: useRef()
        },
        {
            active: false,
            elem: useRef()
        }
    ]);

    const flexWraperRef = useRef();
    const leftSideRef = useRef();
    const rightSideRef = useRef();


    const tabsToggleHandler = (tabIndex) => {
        if (tabs[tabIndex].active) return;

        const newTabs = [...tabs];
        newTabs.map(tab => tab.active = false);
        newTabs[tabIndex].active = true;

        setTabs(newTabs);
    }



    return (
        <div className='ProductProfile'>
            <div className='ProductProfile__flex-wrap' ref={flexWraperRef}>
                {/* ========================== LEFT SIDE START =========================== */}
                <div className='ProductProfile__flex-wrap__left'>
                    <div className='ProductProfile__flex-wrap__left__wrap' ref={leftSideRef}>
                        <ProductMainImage />

                        {/* ========================== FEEDBACK-SECTION START =========================== */}
                        <div className='ProductProfile__feedback-section'>
                            <div className='ProductProfile__feedback-section__title'>
                                Отзывы
                                <span>2</span>
                            </div>
                            <ul>
                                <li><Feedback /></li>
                                <li><Feedback /></li>
                            </ul>

                            <div id='new-feedback' className='ProductProfile__feedback-section__title'>Новый отзыв</div>
                            <FeedbackCreator />
                        </div>
                        {/* ========================== FEEDBACK-SECTION START =========================== */}

                    </div>
                </div>
                {/* ========================== LEFT SIDE END =========================== */}

                {/* ========================== RIGHT SIDE START =========================== */}
                <div className='ProductProfile__flex-wrap__right'>
                    <div className='ProductProfile__flex-wrap__right__wrap' ref={rightSideRef}>
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

                        {/* ========================== TABS START =========================== */}
                        <div className='ProductProfile__tabs'>

                            {/* ========= TABS-BUTTONS START ========= */}
                            <div className='ProductProfile__tabs__titles'>
                                <div onClick={() => tabsToggleHandler(0)} className={clsx('ProductProfile__tabs__titles__item', tabs[0].active && 'active')}>Доставка</div>
                                <div onClick={() => tabsToggleHandler(1)} className={clsx('ProductProfile__tabs__titles__item', tabs[1].active && 'active')}>Оплата</div>
                                <div onClick={() => tabsToggleHandler(2)} className={clsx('ProductProfile__tabs__titles__item', tabs[2].active && 'active')}>Гарантия</div>
                            </div>
                            {/* ========= TABS-BUTTONS END ========= */}

                            {/* ========= TABS-CONTENT#1 START ========= */}
                            <div className={clsx('ProductProfile__tabs__content', tabs[0].active && 'active')}>
                                <ul>
                                    <li>Новой почтой по Украине  — 30 грн.</li>
                                    <li>Курьером к двери по Киеву — 40 грн.</li>
                                </ul>
                                <Link href='/'>
                                    <a>Подробнее о доставке</a>
                                </Link>
                            </div>
                            {/* ========= TABS-CONTENT#1 END ========= */}

                            {/* ========= TABS-CONTENT#2 START ========= */}
                            <div className={clsx('ProductProfile__tabs__content', tabs[1].active && 'active')}>
                                <ul>
                                    <li>Наличными при получении.</li>
                                    <li>Кредитной картой в privat24, LiqPay.</li>
                                    <li>Через кассу или терминал самообслуживания Приватбанк.</li>
                                </ul>
                            </div>
                            {/* ========= TABS-CONTENT#2 END ========= */}

                            {/* ========= TABS-CONTENT#3 START ========= */}
                            <div className={clsx('ProductProfile__tabs__content', tabs[2].active && 'active')}>
                                <p>Гарантия от производителя 12 месяцев</p>
                            </div>
                            {/* ========= TABS-CONTENT#3 END ========= */}

                        </div>
                        {/* ========================== TABS END =========================== */}

                        <div className='ProductProfile__similar-products'>
                            <div className='ProductProfile__section-title'>Смотрите также</div>
                            <LittleProductCarousel ElementsCountToShow={4} />
                        </div>

                        <div className='ProductProfile__similar-products'>
                            <div className='ProductProfile__section-title'>Похожие товары</div>
                            <LittleProductCarousel ElementsCountToShow={4} />
                        </div>
                    </div>

                </div>
                {/* ========================== RIGHT SIDE END =========================== */}

            </div>
        </div>

    )
}