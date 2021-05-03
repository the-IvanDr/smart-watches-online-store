import React, { useState } from 'react';
import clsx from 'clsx';

import Checkbox from '../../components/Checkbox';
import PriceRangeInput from '../../components/PriceRangeInput';
import Substrate from '../../components/Substrate/index';


export default function AdaptiveFilter() {
    const [isMenuActive, setIsMenuActive] = useState(false);
    const [isBrandsListActive, setIsBrandsListActive] = useState(false);

    const closeMenu = () => {
        setIsMenuActive(false);
        setIsBrandsListActive(false);
    }


    return (
        <>
            <Substrate isActive={isMenuActive} onClick={closeMenu} />

            {/*================ Button To Open Adaptive Menu START ========================*/}
            <button className='AdaptiveFilter__open-menu-btn' onClick={() => setIsMenuActive(true)}>
                <i className="fa fa-sliders" aria-hidden="true" />
            </button>
            {/*================ Button To Open Adaptive Menu END ========================*/}


            {/*================ Adaptive Menu START ========================*/}
            <div className={clsx('AdaptiveFilter__menu', isMenuActive && 'active')}>
                <div className='AdaptiveFilter__menu__title'>
                    Настройки каталога
                    <button onClick={() => setIsMenuActive(false)}>✖</button>
                </div>

                <div className='AdaptiveFilter__menu__wrap'>
                    <div className='AdaptiveFilter__menu__section-title'>
                        Сортировка
                    </div>

                    <div className='AdaptiveFilter__menu__select-wrap'>
                        <select className='AdaptiveFilter__menu__sort'>
                            <option>по популярности</option>
                            <option>сначала дешевле</option>
                            <option>по названию</option>
                        </select>
                    </div>

                    <div className='AdaptiveFilter__menu__section-title'>
                        Фильтр
                    </div>

                    <Checkbox title='Новинка' checked={true} />
                    <Checkbox title='Хит' />
                    <Checkbox title='В наличиии' />

                    <div className='AdaptiveFilter__menu__PriceRangeInput'>
                        <div className='AdaptiveFilter__menu__PriceRangeInput__title'>Цена, грн</div>
                        <PriceRangeInput />
                    </div>

                    <div className='AdaptiveFilter__menu__tab' onClick={() => setIsBrandsListActive(true)}>
                        <div className='AdaptiveFilter__menu__tab__title'>Бренд</div>
                        <i className="fa fa-chevron-right" aria-hidden="true" />
                    </div>
                </div>
                {/*================ Adaptive Menu END ========================*/}

                {/*================ Menu Brands List TAB START ========================*/}
                <div className={clsx('AdaptiveFilter__brands-list', isBrandsListActive && 'active')}>
                    <div className='AdaptiveFilter__brands-list__title'>
                        <button onClick={() => setIsBrandsListActive(false)}><i className="fa fa-chevron-left" aria-hidden="true"></i></button>
                        Бренд
                    </div>

                    <div className='AdaptiveFilter__brands-list__wrap'>
                        <Checkbox title='Samsung' />
                        <Checkbox title='Huawei' />
                        <Checkbox title='Garmin' />
                        <Checkbox title='Amazfit' />
                    </div>
                </div>
                {/*================ Menu Brands List TAB END ========================*/}

                {/*================ Menu Main Buttons START ========================*/}
                <div className='AdaptiveFilter__menu__buttons'>
                    <button className='AdaptiveFilter__menu__buttons__apply'>Применить</button>
                    <button className='AdaptiveFilter__menu__buttons__cancel'>Отмена</button>
                </div>
                {/*================ Menu Main Buttons END ========================*/}

            </div>


        </>
    )
}