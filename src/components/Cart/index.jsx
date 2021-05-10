import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux/actions/accountActions';
import clsx from 'clsx';

import { isWidthEnough } from '../../utils/screenHelper.js';
import Link from 'next/link';
import Substrate from '../Substrate';
import CartItem from './CartItem';
import AdaptCartItem from './AdaptCartItem';


export default function Cart({ isActive, toggleCart }) {

    const [totalPrice, setTotalPrice] = useState(0);

    const jwt = useSelector(state => state.auth.authData.token);
    const basket = useSelector(state => state.auth.authData.basket);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!jwt) return;
        console.log('fetch basket from api');
        dispatch(cartActions.get(jwt));

    }, []);

    useEffect(() => {
        console.log('cart loaded', basket);
        if (!basket || basket.length < 1) return;

        const total = basket.length > 1 ? basket.reduce((prev, current) => prev.total_price + current.total_price) : basket[0].total_price;
        setTotalPrice(total);

        return () => document.body.style.overflow = 'auto';
    }, [basket]);

    const changeAmount = (basketId, value) => {
        if (value <= 0) return;
        dispatch(cartActions.setAmount(jwt, basketId, value));
    }

    const deleteItem = (basketId) => {
        dispatch(cartActions.delete(jwt, basketId));
    }


    return (
        <>
            <Substrate isActive={isActive} onClick={toggleCart} />
            <div className={clsx('ModalCart', isActive && isWidthEnough() && 'active')}>
                <div className='ModalCart__overeflow-wrapp'>
                    <button className='ModalCart__close-btn' onClick={toggleCart}>✖</button>
                    <div className='ModalCart__title'>Корзина</div>

                    <div className='ModalCart__table'>
                        <div className='ModalCart__table__row _header'>
                            <div className='ModalCart__table__amount'>
                                Количество
                            </div>
                            <div className='ModalCart__table__cost'>
                                Стоимость
                            </div>
                        </div>

                        {
                            basket &&
                            basket.map(item => (
                                <CartItem
                                    key={item.id}
                                    imgSrc={item.product.imageSrc}
                                    name={item.product.name}
                                    price={item.product.price}
                                    amount={item.amount}
                                    totalPrice={item.total_price}

                                    increaseHandler={() => changeAmount(item.id, item.amount + 1)}
                                    decreaseHandler={() => changeAmount(item.id, item.amount - 1)}
                                    deleteHandler={() => deleteItem(item.id)}
                                />
                            ))
                        }

                        <div className='ModalCart__table__row'>
                            <button className='ModalCart__table__continue-shopping' onClick={toggleCart}>
                                <i aria-hidden className="fas fa-arrow-left" />
                                Вернуться к покупкам
                            </button>
                            <div className='ModalCart__table__summary'>
                                <div className='ModalCart__table__summary__price'>Итого <span>{totalPrice} грн</span></div>
                                <Link href='/ordering' ><a className='ModalCart__table__summary__checkout-btn'>Оформить заказ</a></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={clsx('AdaptiveCart', isActive && 'active')}>
                <div className='AdaptiveCart__title'>
                    Корзина
                    <button onClick={toggleCart}>✖</button>
                </div>

                <div className='AdaptiveCart__list'>
                    {
                        basket && 
                        basket.map(item => (
                            <AdaptCartItem
                                key={item.id}
                                imgSrc={item.product.imageSrc}
                                name={item.product.name}
                                price={item.product.price}
                                amount={item.amount}

                                changeAmountHandler={(value) => changeAmount(item.id, value)}
                                deleteHandler={() => deleteItem(item.id)}
                            />
                        ))
                    }
                </div>

                <div className='AdaptiveCart__total-price'>{totalPrice} грн</div>
                <Link href='/ordering'><a className='AdaptiveCart__checkout-btn'>Оформить заказ</a></Link>
            </div>
        </>
    )
}