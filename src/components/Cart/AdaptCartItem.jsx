import React from 'react';


export default function AdaptCartItem({ imgSrc, name, price, amount, totalPrice, changeAmountHandler, deleteHandler }) {


    const OptionList = ({ amount }) => {
        const options = [];
        for (let i = 1; i <= amount + 10; i++) {
            options.push(<option key={`${name}-${i}`} selected={amount === i}>{i}</option>);
        }

        return options;
    }

    return (
        <div className='AdaptiveCart__list__item'>
            <img src={imgSrc} alt='watch' />
            <div className='AdaptiveCart__list__item__right-block'>
                <div className='AdaptiveCart__list__item__title'>{name}</div>
                <div className='AdaptiveCart__list__item__price'>{price} грн</div>
                <div className='AdaptiveCart__list__item__inputs'>
                    <div className='select'>
                        <i aria-hidden className="fas fa-chevron-down" />
                        <select onChange={(ev) => changeAmountHandler(ev.target.options.selectedIndex + 1)} selected='5'>
                            <OptionList amount={amount} />
                        </select>
                    </div>
                    <button onClick={deleteHandler}><i aria-hidden className="fas fa-trash-alt" /></button>
                </div>
            </div>
        </div>
    )
}