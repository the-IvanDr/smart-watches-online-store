import React from 'react';


export default function CartItem({imgSrc, name, price, amount, totalPrice, increaseHandler, decreaseHandler, deleteHandler}) {
    return (
        <div className='ModalCart__table__row'>
            <button className='ModalCart__table__row__delete-btn' onClick={deleteHandler}>
                <i aria-hidden className="fas fa-trash-alt" />
            </button>

            <div className='ModalCart__table__image'>
                <img src={imgSrc} alt='product-img' />
            </div>

            <div className='ModalCart__table__details'>
                <div className='ModalCart__table__details__title'>{name}</div>
                <div className='ModalCart__table__details__price'>{price} грн</div>
            </div>

            <div className='ModalCart__table__amount'>
                <div className='ModalCart__table__amount__input'>
                    <button className='decrease' onClick={decreaseHandler}>—</button>
                    <input type='number' value={amount} min='1' max='9999' />
                    <button className='increase' onClick={increaseHandler}>+</button>
                </div>
            </div>

            <div className='ModalCart__table__cost'>
                <span>{totalPrice} грн</span>
            </div>
        </div>
    )
}