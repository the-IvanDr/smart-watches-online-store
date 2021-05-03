import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../redux/actions/filterActions';
import * as APIQuery from '../../utils/APIQuery';

import Checkbox from '../../components/Checkbox';
import PriceRangeInput from '../../components/PriceRangeInput';


export default function FullFilter() {

    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();


    useEffect(async () => {
        const response = await APIQuery.Brands.getList();
        const brands = response.data.brands.map(brand => ({ active: false, name: brand.name, id: brand.id }));
        dispatch(changeField('brands', brands));
    }, []);


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
                            <li><Checkbox title='Новинка' checked={filter.icons.novelty} onClick={() => dispatch(changeField('icons', { ...filter.icons, novelty: !filter.icons.novelty }))} /></li>
                            <li><Checkbox title='Хит' checked={filter.icons.hit} onClick={() => dispatch(changeField('icons', { ...filter.icons, hit: !filter.icons.hit }))} /></li>
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
                            <li><Checkbox title='В наличии' checked={filter.presents} onClick={() => dispatch(changeField('presents', !filter.presents))} /></li>

                        </ul>
                    </div>
                </div>

                <div className='Filter__item'>
                    <ItemHead title='Бренд' />

                    <div className='Filter__item__dropdown'>
                        <ul>
                            {filter.brands.map(brand => {

                                const onClickHandler = () => {
                                    const newBrands = filter.brands.map(item => {
                                        if (item.id === brand.id) item.active = !brand.active;
                                        return item;
                                    });

                                    dispatch(changeField('brands', newBrands));
                                }

                                return (
                                    <li key={`brand-${brand.id}-${brand.name}`}>
                                        <Checkbox
                                            title={brand.name}
                                            checked={brand.active}
                                            onClick={onClickHandler}
                                        />
                                    </li>
                                )
                            })}
                            {/* <li><Checkbox title='Samsung' href='/' /></li>
                            <li><Checkbox title='Huawei' href='/' /></li>
                            <li><Checkbox title='Garmin' href='/' /></li>
                            <li><Checkbox title='Amazfit' href='/' /></li> */}
                        </ul>
                    </div>
                </div>
            </div>

            <div className='Filter__left-wrapp'>
                <div className='Filter__title'>Сортировка:</div>

                <div className='Filter__item'>
                    <ItemHead title={filter.sort.find(item => item.active).title} />

                    <div className='Filter__item__dropdown -sort'>
                        <ul>
                            {filter.sort.map(item => {
                                if (item.active) return;

                                const onClickHandler = () => {
                                    const newSort = filter.sort.map(i => {
                                        if(i.name === item.name) i.active = true;
                                        else i.active = false;
                                        
                                        return i;
                                    });

                                    dispatch(changeField('sort', newSort));
                                }

                                return <li className='sort-option' onClick={onClickHandler}>{item.title}</li>
                            })}
                            {/* <li className='sort-option'>сначала дешевле</li>
                            <li className='sort-option'>по названию</li> */}
                        </ul>
                    </div>
                </div>
            </div>
        </div >
    )
}