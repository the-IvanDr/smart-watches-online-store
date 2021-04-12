import React, { useState } from 'react';

import clsx from 'clsx';
import Link from 'next/link';
import Image from 'next/image';

import AdaptiveBarMenu from '../../components/AdaptiveBarMenu';
import SearchLine from '../../components/SearchLine';
import Cart from '../../components/Cart';
import Authorization from '../../components/Authorization/ModalAuthorization';


export default function Header(props) {
    const [isYellow] = useState(props.yellow);
    const [isAuthDropDownMenuActive, setIsAuthDropDownMenuActive] = useState(false);
    const [isAdaptMenuActive, setIsAdaptMenuActive] = useState(false);
    const [isSearchLineActive, setIsSearchLineActive] = useState(false);
    const [isCartActive, setIsCartActive] = useState(false);
    const [isAuthorizationActive, setIsAuthorizationActive] = useState(false);

    const toggleMenu = () => {
        setIsAdaptMenuActive(prev => !prev);
        document.body.style.overflow = !isAdaptMenuActive ? 'hidden' : 'auto';
    }

    const toggleSearchLine = () => {
        setIsSearchLineActive(prev => !prev);
    }

    const toggleCart = () => {
        setIsCartActive(prev => !prev);
        document.body.style.overflow = !isCartActive ? 'hidden' : 'auto';
    }

    const toggleAuthorization = () => {
        setIsAuthorizationActive(prev => !prev);
        document.body.style.overflow = !isAuthorizationActive ? 'hidden' : 'auto';
    }

    return (
        <div className={clsx('Header', isYellow && 'Header_yellow')}>
            <div className='Header__container'>

                {/*================= Adaptive Components START =======================*/}
                <AdaptiveBarMenu isActive={isAdaptMenuActive} toggleMenu={toggleMenu} />
                <SearchLine isActive={isSearchLineActive} toggleSearchLine={toggleSearchLine} />
                <Cart isActive={isCartActive} toggleCart={toggleCart} />
                <Authorization isActive={isAuthorizationActive} toggleAuthorization={toggleAuthorization} />

                <div className='Header__right-wrapper'>
                    <div className='Header__bars-menu' onClick={toggleMenu}>
                        <i aria-hidden className="fas fa-bars" />
                    </div>

                    <div className='Header__search' onClick={toggleSearchLine}>
                        <i aria-hidden className="fas fa-search" />
                    </div>
                </div>

                <Link href='/'>
                    <a className='Header__logo'>
                        <img src='../assets/images/header/logo.jpg' alt='logo' />
                    </a>
                </Link>

                <div className='Header__buscket' onClick={toggleCart}>
                    <i aria-hidden className="fas fa-shopping-basket" />
                </div>
                {/*================= Adaptive Components END =======================*/}



                {/*================= Other Components START =======================*/}
                <nav className='Header__nav'>
                    <ul>
                        <li><a href='/'>Мужские</a></li>
                        <li><a href='/'>Женские</a></li>
                        <li><a href='/'>Детские</a></li>
                        <li><a href='/'>Аксессуары</a></li>
                        <li><a href='/'>Бренды</a></li>
                    </ul>
                </nav>

                {/*================= Accaunt Menu START =======================*/}
                <div className='Header__acc-menu'>
                    <button className='Header__acc-menu__desire-list'>
                        <i aria-hidden className="far fa-heart" />
                        <span>2</span>
                    </button>

                    {/*================= Auth Menu START =======================*/}
                    <div
                        className='Header__acc-menu__auth'
                        onClick={toggleAuthorization}
                        onMouseEnter={() => setIsAuthDropDownMenuActive(true)}
                        onMouseLeave={() => setIsAuthDropDownMenuActive(false)}
                    >
                        <i aria-hidden className="fas fa-user" />
                        <div className={clsx(
                            'Header__acc-menu__auth__drop-down-menu',
                            isAuthDropDownMenuActive && 'active'
                        )}>
                            <ul>
                                <li><a href='/'>Личные данные</a></li>
                                <li><a href='/'>Заказы</a></li>
                                <li><a href='/'>Список желаний</a><i aria-hidden className="fas fa-heart" /></li>
                                <li><a href='/'>Выйти</a></li>
                            </ul>
                        </div>
                    </div>
                    {/*================= Auth Menu END =======================*/}

                    {/*================= Cart toggle Button START =======================*/}
                    <button className='Header__acc-menu__basket' onClick={toggleCart}>
                        <div className='Header__acc-menu__basket__left'>
                            <i aria-hidden className="fas fa-shopping-cart" />
                            <span>2</span>
                        </div>
                        <div className='Header__acc-menu__basket__right'>
                            <div className='Header__acc-menu__basket__title'>Мой заказ</div>
                            <div className='Header__acc-menu__basket__price'><span>4999</span> грн</div>
                        </div>
                    </button>
                    {/*================= Cart toggle Button END =======================*/}

                </div>
                {/*================= Accaount Menu END =======================*/}
                {/*================= Other Components END =======================*/}

            </div>
        </div>
    )
}