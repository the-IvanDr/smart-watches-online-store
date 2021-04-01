import React from 'react';
import clsx from 'clsx';

import Substrate from '../Substrate';


export default function Cart({ isActive, toggleCart }) {

    // Function to check is the width enough to open the modal screen (FOR ADAPTIVE)
    const isWidthEnough = () => {
        const ENOUGH_WIDTH = 1340;
        return window.innerWidth > ENOUGH_WIDTH;
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


                        {/********************************
                            Dinamic part of markup START 
                        **********************************/}
                        <div className='ModalCart__table__row'>
                            <button className='ModalCart__table__row__delete-btn'>
                                <i aria-hidden className="fas fa-trash-alt" />
                            </button>

                            <div className='ModalCart__table__image'>
                                <img src='../assets/images/products/huawei_gt_classic.jpg' alt='product-img' />
                            </div>

                            <div className='ModalCart__table__details'>
                                <div className='ModalCart__table__details__title'>Смарт-часы HUAWEI Watch GT Classic</div>
                                <div className='ModalCart__table__details__price'>5 999 грн</div>
                            </div>

                            <div className='ModalCart__table__amount'>
                                <div className='ModalCart__table__amount__input'>
                                    <button className='decrease'>—</button>
                                    <input type='number' min='1' max='9999' />
                                    <button className='increase'>+</button>
                                </div>
                            </div>

                            <div className='ModalCart__table__cost'>
                                <span>20 000 грн</span>
                            </div>
                        </div>

                        <div className='ModalCart__table__row'>
                            <button className='ModalCart__table__row__delete-btn'>
                                <i aria-hidden className="fas fa-trash-alt" />
                            </button>

                            <div className='ModalCart__table__image'>
                                <img src='../assets/images/products/huawei_gt_classic.jpg' alt='product-img' />
                            </div>

                            <div className='ModalCart__table__details'>
                                <div className='ModalCart__table__details__title'>Смарт-часы HUAWEI Watch GT Classic</div>
                                <div className='ModalCart__table__details__price'>5 999 грн</div>
                            </div>

                            <div className='ModalCart__table__amount'>
                                <div className='ModalCart__table__amount__input'>
                                    <button className='decrease'>—</button>
                                    <input type='number' min='1' max='9999' />
                                    <button className='increase'>+</button>
                                </div>
                            </div>

                            <div className='ModalCart__table__cost'>
                                <span>20 000 грн</span>
                            </div>
                        </div>
                        {/********************************
                            Dinamic part of markup END 
                        **********************************/}



                        <div className='ModalCart__table__row'>
                            <button className='ModalCart__table__continue-shopping' onClick={toggleCart}>
                                <i aria-hidden className="fas fa-arrow-left" />
                                Вернуться к покупкам
                            </button>
                            <div className='ModalCart__table__summary'>
                                <div className='ModalCart__table__summary__price'>Итого <span>29 997 грн</span></div>
                                <a href='/' className='ModalCart__table__summary__checkout-btn'>Оформить заказ</a>
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
                    <div className='AdaptiveCart__list__item'>
                        <img src='../assets/images/products/amazfit__verge.jpg' alt='watch' />
                        <div className='AdaptiveCart__list__item__right-block'>
                            <div className='AdaptiveCart__list__item__title'>Смарт-часы HUAWEI Watch GT Classic</div>
                            <div className='AdaptiveCart__list__item__price'>5 999 грн</div>
                            <div className='AdaptiveCart__list__item__inputs'>
                                <div className='select'>
                                    <i aria-hidden className="fas fa-chevron-down" />
                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10+</option>
                                    </select>
                                </div>
                                <button><i aria-hidden className="fas fa-trash-alt" /></button>
                            </div>
                        </div>
                    </div>

                    <div className='AdaptiveCart__list__item'>
                        <img src='../assets/images/products/amazfit__verge.jpg' alt='watch' />
                        <div className='AdaptiveCart__list__item__right-block'>
                            <div className='AdaptiveCart__list__item__title'>Смарт-часы HUAWEI Watch GT Classic</div>
                            <div className='AdaptiveCart__list__item__price'>5 999 грн</div>
                            <div className='AdaptiveCart__list__item__inputs'>
                                <div className='select'>
                                    <i aria-hidden className="fas fa-chevron-down" />
                                    <select>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                        <option>6</option>
                                        <option>7</option>
                                        <option>8</option>
                                        <option>9</option>
                                        <option>10+</option>
                                    </select>
                                </div>
                                <button><i aria-hidden className="fas fa-trash-alt" /></button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='AdaptiveCart__total-price'>15 998 грн</div>
                <a href='/' className='AdaptiveCart__checkout-btn'>Оформить заказ</a>
            </div>
        </>
    )
}