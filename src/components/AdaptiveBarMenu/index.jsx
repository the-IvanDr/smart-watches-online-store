import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../redux/actions/accountActions';
import clsx from 'clsx';

import Substrate from '../Substrate';
import AdaptiveAuthorization from '../Authorization/AdaptiveAuthorization';


export default function AdaptiveBarMenu({ isActive, toggleMenu }) {
    const [isCatalogActive, setIsCatalogActive] = useState(false);
    const [isCallReqActive, setIsCallReqActive] = useState(false);
    const [isAuthorizationActive, setIsAuthorizationActive] = useState(false);

    const isAuth = !!(useSelector(state => state.auth.authData.token));
    const dispatch = useDispatch();

    const MainMenu_ref = useRef();
    const CallReqBlock_ref = useRef();
    const Authorization_ref = useRef();

    useEffect(() => {
        MainMenu_ref.current.style.overflowY = isCatalogActive || isCallReqActive || isAuthorizationActive ? 'hidden' : 'auto';
    }, [isCatalogActive, isCallReqActive, isAuthorizationActive]);


    const logoutHandler = () => {
        dispatch(logout())
    }


    const showCallReqBlock = () => {
        CallReqBlock_ref.current.style.top = MainMenu_ref.current.scrollTop + 'px';
        setIsCallReqActive(true);
    }

    const showAuthorizationBlock = () => {
        if (isAuth) return;
        Authorization_ref.current.style.top = MainMenu_ref.current.scrollTop + 'px';
        setIsAuthorizationActive(true);
    }

    return (
        <>
            {/* Background dimming block */}
            <Substrate isActive={isActive} onClick={toggleMenu} />

            {/* Main block with navigation */}
            <div className={clsx('AdaptiveBarMenu', isActive && 'active')}
                ref={MainMenu_ref}
            >
                <div className='AdaptiveBarMenu__title'>
                    <button className='AdaptiveBarMenu__close-btn' onClick={toggleMenu}>✖</button>
                    TimeShop
                </div>


                {/* Main nav-menu */}
                <nav>
                    <ul>
                        <li className="tab-btn" onClick={() => setIsCatalogActive(true)}>
                            Каталог
                            <i aria-hidden className="fas fa-chevron-right" />
                        </li>

                        <li><a href='/'>О нас</a></li>
                        <li><a href='/'>Оплата и доставка</a></li>
                        <li><a href='/'>Обмен и возврат</a></li>
                        <li><a href='/'>Контактная информация</a></li>

                        <li className='desire-list'>
                            <a href='/'>Список желаний</a>
                            <i aria-hidden className="far fa-heart" />
                        </li>
                        <li><a href='/'>Мой профиль</a></li>
                        <li><a href='/'>Мои заказы</a></li>
                        <li>
                            {
                                isAuth
                                    ? <button onClick={logoutHandler}>Выйти</button>
                                    : <button onClick={showAuthorizationBlock}>Войти</button>
                            }
                            <i aria-hidden className="fas fa-sign-out-alt" />
                        </li>

                        <li className='contacts'>
                            <a href='tel:+38050'>044 000-00-00</a>
                            <i aria-hidden className="fas fa-phone-square-alt" />
                        </li>
                        <li><a href='tel:+38095'>095 000-00-00</a></li>
                        <li>
                            <a href='/'>095 000-00-00</a>
                            <i aria-hidden className="fab fa-viber" />
                        </li>
                        <li>
                            <a href='/'>skype</a>
                            <i aria-hidden className="fab fa-skype" />
                        </li>
                        <li>
                            <a href='/'>telegram</a>
                            <i aria-hidden className="fab fa-telegram" />
                        </li>
                        <li>
                            <a href='/'>whats-app</a>
                            <i aria-hidden className="fab fa-whatsapp" />
                        </li>
                        <li>
                            <button className='call-request' onClick={showCallReqBlock}>
                                Заказать звонок
                            </button>
                        </li>

                        <li className='socials'>
                            Мы в соцсетях
                            <div className='socials__wrapper'>
                                <img src="../assets/icons/vk.svg" alt="vk" />
                                <img src="../assets/icons/facebook.svg" alt="vk" />
                                <img src="../assets/icons/twitter.svg" alt="vk" />
                                <img src="../assets/icons/instagram.svg" alt="vk" />
                            </div>
                        </li>
                    </ul>
                </nav>

                {/* Catalog nav-menu */}
                <div className={clsx('catalog', isCatalogActive && 'active')}>
                    <div className='AdaptiveBarMenu__title thin'>
                        <button
                            className='AdaptiveBarMenu__back-btn'
                            onClick={() => setIsCatalogActive(false)}
                        >
                            <i aria-hidden className="fas fa-chevron-left" />
                            Меню
                        </button>
                    </div>

                    <nav>
                        <ul>
                            <li><a href='/'>Мужские</a></li>
                            <li><a href='/'>Женские</a></li>
                            <li><a href='/'>Детские</a></li>
                            <li><a href='/'>Аксессуары</a></li>
                            <li><a href='/'>Бренды</a></li>
                        </ul>
                    </nav>
                </div>

                {/* Request a call */}
                <div className={clsx('call-request-screen', isCallReqActive && 'active')}
                    ref={CallReqBlock_ref}
                >
                    <div className='AdaptiveBarMenu__title thin'>
                        <button className='AdaptiveBarMenu__back-btn' onClick={() => setIsCallReqActive(false)}>
                            <i aria-hidden className="fas fa-chevron-left" />
                            Заказать звонок
                        </button>
                    </div>

                    <div className='call-request-screen__wrapper'>
                        <p>Укажите ваш номер телефона и имя. Мы свяжемся с вами в ближайшее время.</p>

                        <div className='form-inputs'>
                            <div className='form-inputs__item'>
                                <i aria-hidden className="fas fa-user" />
                                <input type="text" placeholder='Имя и фамилия' />
                            </div>
                            <div className='form-inputs__item'>
                                <i aria-hidden className="fas fa-phone-alt" />
                                <input type="tel" placeholder='Телефон' />
                            </div>
                            <button>Отправить</button>
                        </div>
                    </div>
                </div>

                {/* Authorization block */}
                <AdaptiveAuthorization
                    isActive={isAuthorizationActive}
                    closeAuthorization={() => setIsAuthorizationActive(false)}
                    AuthRef={Authorization_ref}
                />
            </div>
        </>
    )
}