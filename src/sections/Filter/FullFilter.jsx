import React from 'react';

import Checkbox from '../../components/Checkbox';
import PriceRangeInput from '../../components/PriceRangeInput';


export default function FullFilter() {

    const ItemHead = ({ title }) => (
        <div className='Filter__item__title'>
            {title}
        </div>
    );

    return (
        <div className='Filter'>
            <div className='Filter__right-wrapp'>
                <div className='Filter__title'>Фильтр</div>

                <div className='Filter__item'>
                    <ItemHead title='Иконки' />

                    <div className='Filter__item__dropdown'>
                        <ul>
                            <li><Checkbox title='Новинка' href='/' /></li>
                            <li><Checkbox title='Хит' href='/' /></li>
                        </ul>
                    </div>

                </div>

                <div className='Filter__item'>
                    <ItemHead title='Цена, грн' />

                    <div className='Filter__item__dropdown'>
                        <span className='PriceRangeInput-wrap'>
                            <PriceRangeInput />
                        </span>
                    </div>

                </div>

                <div className='Filter__item'>
                    <ItemHead title='Наличие' />

                    <div className='Filter__item__dropdown'>
                        <ul>
                            <li><Checkbox title='В наличии' href='/' /></li>

                        </ul>
                    </div>
                </div>

                <div className='Filter__item'>
                    <ItemHead title='Бренд' />

                    <div className='Filter__item__dropdown'>
                        <ul>
                            <li><Checkbox title='Samsung' href='/' /></li>
                            <li><Checkbox title='Huawei' href='/' /></li>
                            <li><Checkbox title='Garmin' href='/' /></li>
                            <li><Checkbox title='Amazfit' href='/' /></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className='Filter__left-wrapp'>
                <div className='Filter__title'>Сортировка:</div>

                <div className='Filter__item'>
                    <ItemHead title='по популярности' />

                    <div className='Filter__item__dropdown -sort'>
                        <ul>
                            <li><a className='sort-option' href='/'>сначала дешевле</a></li>
                            <li><a className='sort-option' href='/'>по названию</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}