import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from './../../redux/actions/accountActions';


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

    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const isAuth = !!(useSelector(state => state.auth.authData.token));
    const authData = useSelector(state => state.auth.authData);
    const basket = useSelector(state => state.auth.authData.basket);
    const dispatch = useDispatch();


    useEffect(() => {
        if(!basket || basket.length < 1) return;
        const total = basket.length > 1 ? basket.reduce((prev, current) => prev.total_price + current.total_price) : basket[0].total_price;
        setTotalCartPrice(total);

    }, [basket]);


    const logoutHandler = () => {
        dispatch(logout());
    }

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
        if (!isAuthorizationActive && isAuth) return;
        setIsAuthorizationActive(prev => !prev);
        document.body.style.overflow = !isAuthorizationActive ? 'hidden' : 'auto';
    }

    useEffect(() => {
        if (isAuth && isAuthorizationActive) {
            setIsAuthorizationActive(false);
            document.body.style.overflow = 'auto';
        }

    }, [isAuth]);

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
                        <li><Link href='/catalog/man'><a className={clsx(props.activeTab === 0 && 'active')}>Мужские</a></Link></li>
                        <li><Link href='/catalog/woman'><a className={clsx(props.activeTab === 1 && 'active')}>Женские</a></Link></li>
                        <li><Link href='/catalog/kid'><a className={clsx(props.activeTab === 2 && 'active')}>Детские</a></Link></li>
                        <li><Link href='/catalog/accessories'><a className={clsx(props.activeTab === 3 && 'active')}>Аксессуары</a></Link></li>
                        <li><Link href='/brands'><a className={clsx(props.activeTab === 4 && 'active')}>Бренды</a></Link></li>
                    </ul>
                </nav>

                {/*================= Accaunt Menu START =======================*/}
                <div className='Header__acc-menu'>
                    <button className='Header__acc-menu__desire-list'>
                        <i aria-hidden className="far fa-heart" />
                        {/* <span>2</span> */}
                    </button>

                    {/*================= Auth Menu START =======================*/}
                    <div
                        className='Header__acc-menu__auth'
                        onClick={toggleAuthorization}
                        onMouseEnter={() => setIsAuthDropDownMenuActive(true)}
                        onMouseLeave={() => setIsAuthDropDownMenuActive(false)}
                    >
                        {
                            isAuth
                                ? `${authData.fullName.fName[0]}${authData.fullName.lName[0]}`
                                : <i aria-hidden className="fas fa-user" />
                        }

                        <div className={clsx(
                            'Header__acc-menu__auth__drop-down-menu',
                            (isAuthDropDownMenuActive && isAuth) && 'active'
                        )}>
                            <ul>
                                <li><a href='/'>Личные данные</a></li>
                                <li><a href='/'>Заказы</a></li>
                                <li><a href='/'>Список желаний</a><i aria-hidden className="fas fa-heart" /></li>
                                {authData.role === 'ADMIN' && <li><Link href='/administrator'><a>Админ. панель</a></Link></li>}
                                <li><button onClick={logoutHandler}>Выйти</button></li>
                            </ul>
                        </div>
                    </div>
                    {/*================= Auth Menu END =======================*/}

                    {/*================= Cart toggle Button START =======================*/}
                    <button className='Header__acc-menu__basket' onClick={toggleCart}>
                        <div className='Header__acc-menu__basket__left'>
                            <i aria-hidden className="fas fa-shopping-cart" />
                            {basket && basket.length > 0 && <span>{basket.length}</span>}
                        </div>
                        <div className='Header__acc-menu__basket__right'>
                            <div className='Header__acc-menu__basket__title'>Мой заказ</div>
                            <div className='Header__acc-menu__basket__price'><span>{totalCartPrice}</span> грн</div>
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