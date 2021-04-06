import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

import ProductMainImage from '../../components/ProductMainImage';
import Feedback from '../../components/Feedback';
import FeedbackCreator from '../../components/FeedBackCreator';
import Breadcrumbs from './../../components/Breadcrumbs/index';

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

            {/* ========================== DESCRIPTION START =========================== */}
            <div className='ProductProfile__description'>
                <h4 className='ProductProfile__description__title'>Описание</h4>

                <h4 className='ProductProfile__description__title'>Спортивные часы Xiaomi Amazfit Verge</h4>
                <p>Xiaomi Amazfit Verge – умные часы, которые получили 11 спортивных режимов. С ними вам не придется доставать телефон, чтобы посмотреть уведомления, воспользоваться картой или принять телефонный звонок.</p>

                <ul>
                    <h4>Особенности:</h4>
                    <li>Сенсорный 1.3” AMOLED дисплей</li>
                    <li>11 спортивных режимов</li>
                    <li>Датчик геопозиционирования GPS</li>
                    <li>Защита от пыли и влаги (плавание и душ не рекомендованы)</li>
                    <li>Закаленное стекло Corning Gorilla 3</li>
                    <li>До 5-ти дней автономной работы</li>
                    <li>Вес – 46 граммов</li>
                </ul>

                <img src='/assets/images/article/description-1.webp' alt='descr' />

                <h4 className='ProductProfile__description__title'>Информативный дисплей</h4>
                <p>Для работы со встроенными приложениями, управления камерой вашего смартфона и просмотра уведомлений Xiaomi Amazfit Verge получили энергоэффективный сенсорный 1.3” AMOLED дисплей. Данная технология делает информацию читабельной даже на ярком солнце и позволяет часам работать автономно до 5-ти дней. Разрешение экрана 360 х 360 пикселей.</p>

                <h4 className='ProductProfile__description__title'>Производительная начинка</h4>
                <p>Аксессуар работает под управлением фирменной AMAZFIT OS, созданной на базе Android. Для быстрой работы девайс получил  двухъядерный процессор с частотой 1,2 ГГц, 512 Мб оперативной памяти и 4 гигабайта внутренней памяти. Связь с другими мобильными устройствами и интернетом обеспечивает технология Bluetooth 4.0 LE.</p>

                <img src='/assets/images/article/description-2.webp' alt='descr' />

                <h4 className='ProductProfile__description__title'>На страже здоровья</h4>
                <p>Спортивные часы получили набор датчиков для контроля физического состояния и активности. Пульсометр позволяет отслеживать ваш сердечный ритм, как в состоянии спокойствия, так и под нагрузкой. Шагомер считает пройденное расстояние, чтобы вы смогли понять, получаете ли достаточно физической активности.</p>
                
                <img src='/assets/images/article/description-3.webp' alt='descr' />
                <img src='/assets/images/article/description-4.webp' alt='descr' />
                
                <h4 className='ProductProfile__description__title'>Спортивные режимы</h4>
                <p>При разработке Amazfit Verge производитель ориентировался на потребности профессиональных спортсменов и тех, кто просто ведет здоровый образ жизни. Часы получили 11 спортивных режимов, среди которых ходьба, скалолазание, теннис, катание на лыжах, футбол, езда на велосипеде, эллиптические тренировки и другие. В меню каждого из видов спорта доступны специфические для него настройки. К примеру, в режиме бега можно загрузить маршрут для пробежки.</p>
                <img src='/assets/images/article/description-5.webp' alt='descr' />

                <h4 className='ProductProfile__description__title'>Ориентация в пространстве</h4>
                <p>Любите ходить в походы или путешествовать, открывая для себя новые страны и города? Спортивные часы будут как раз кстати. Для позиционирования в пространстве девайс получил датчик GPS. С его помощью можно увидеть свое местонахождение в приложении с картами, что позволит продолжить маршрут в нужном направлении.</p>
                <img src='/assets/images/article/description-6.webp' alt='descr' />

                <h4 className='ProductProfile__description__title'>Спортивный стиль</h4>
                <p>Часы выполнены в минималистичном круглом корпусе с оранжевыми деталями, который придется по вкусу почитателям спортивного стиля. Также их дизайн удачно впишется и в повседневный стиль. Эластичный ремешок Amazfit Verge создан для активного времяпрепровождения. При этом его можно снять и заменить на другой, преобразив таким образом ваш аксессуар.</p>
                <img src='/assets/images/article/description-8.webp' alt='descr' />
                
                <h4 className='ProductProfile__description__title'>Защищенный девайс</h4>
                <p>Этот аксессуар готов пройти с вами любые испытания. Производителем предусмотрена защита от пыли и влаги. С ними можно не бояться попасть под небольшой дождь, да и пот во время тренировки не повредит устройство. При этом принимать с часами душ или плавать производитель не рекомендует. Закаленное стекло Corning Gorilla 3 защищает дисплей от случайных ударов и царапин.</p>
            </div>
            {/* ========================== DESCRIPTION END =========================== */}

        </div>
    )
}