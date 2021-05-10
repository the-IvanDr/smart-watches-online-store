import React, { useState, useEffect } from 'react';
import { getCity, getWarehouse } from './../../utils/NPApi';
import ua from 'react-phone-number-input/locale/ua'
import PhoneInput from 'react-phone-number-input';
import AdaptCartItem from './../../components/Cart/AdaptCartItem';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../../redux/actions/accountActions';


export default function Ordering() {

    const jwt = useSelector(state => state.auth.authData.token);

    const [name, setName] = useState(useSelector(state => state.auth.authData.fullName.lName + ' '
        + state.auth.authData.fullName.fName + ' '
        + state.auth.authData.fullName.mName
    ));

    const [phoneNumber, setPhoneNumber] = useState('');

    const [city, setCity] = useState('');
    const [cityList, setCityList] = useState([]);

    const [deliveryMethod, setDeliveryMethod] = useState({
        current: 'Новой почтой',
        list: ['Новой почтой', 'Курьером по Киеву'],
        isShown: false
    });

    const [warehouse, setWarehouse] = useState({
        current: '',
        list: [],
        SiteKey: '',
        isShown: false
    });

    const [paymentMethod, setPaymentMethod] = useState({
        current: 'Наличными',
        list: ['Наличными', "Безналичный расчет", "Онлайн-оплата банковской картой", "Оплата при получении", "Приват24"],
        isShown: false
    });


    // Get city list from NovaPosta API by string
    useEffect(async () => {
        const CityList = await getCity(city);
        setCityList(CityList);
        if (city.length < 3) return;

        const WarehouseList = await getWarehouse(city);
        if (WarehouseList[0]) {
            setWarehouse(prev => ({
                ...prev,
                current: WarehouseList[0].DescriptionRu,
                list: WarehouseList
            }));
        }
    }, [city]);


    // ======================= CART HANDLING -START ========================
    const [totalPrice, setTotalPrice] = useState(0);
    const basket = useSelector(state => state.auth.authData.basket);
    const dispatch = useDispatch();
    useEffect(() => {
        if (basket.length < 1) return;
        const total = basket.length > 1 ? basket.reduce((prev, current) => prev.total_price + current.total_price) : basket[0].total_price;
        setTotalPrice(total);
    }, [basket]);

    const changeAmount = (basketId, value) => {
        if (value <= 0) return;
        dispatch(cartActions.setAmount(jwt, basketId, value));
    }

    const deleteItem = (basketId) => {
        dispatch(cartActions.delete(jwt, basketId));
    }
    // ======================= BASKET HANDLING -END ========================


    return (
        <div className='Ordering'>
            <div className='Ordering__title' onClick={() => getWarehouse("Славянск")}>Оформление заказа</div>

            <div className='Ordering__flex-wrapper'>
                <div className='Ordering__form'>
                    <div className='Ordering__form__group'>
                        <div className='Ordering__form__group__title' style={{ marginBottom: 20 }}>Получатель заказа</div>

                        <div className='Ordering__form__input-wrapper'>
                            <div className='Ordering__form__label'>ФИО</div>
                            <input value={name} onChange={(ev) => setName(ev.target.value)} type='text' />
                        </div>

                        <div className='Ordering__form__input-wrapper'>
                            <div className='Ordering__form__label'>Телефон</div>
                            <PhoneInput
                                value={phoneNumber}
                                onChange={setPhoneNumber}
                                international
                                countryCallingCodeEditable={false}
                                labels={ua}
                                defaultCountry='UA'
                                useNationalFormatForDefaultCountryValue={true}
                            />
                        </div>

                        <div className='Ordering__form__input-wrapper'>
                            <div className='Ordering__form__label'>Город</div>
                            <input
                                type='text'
                                value={city}
                                onChange={(ev) => setCity(ev.target.value)}
                            />

                            {
                                !!cityList.length &&
                                <div className='Ordering__form__dropdown'>
                                    <ul>
                                        {cityList.map((item, index) => (
                                            <li
                                                key={`${index}-${item.MainDescription}`}
                                                onClick={() => { setCity(item.MainDescription); setCityList([]) }}
                                            >{item.Present}</li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='Ordering__form__group'>
                        <div className='Ordering__form__input-wrapper select'>
                            <div className='Ordering__form__label Ordering__form__group__title'>Доставка</div>
                            <input
                                value={deliveryMethod.current}

                                onClick={(ev) => { setDeliveryMethod(prev => ({ ...prev, isShown: true })) }}

                                readOnly={true}
                                type='text'
                            />

                            {
                                deliveryMethod.isShown &&
                                <div className='Ordering__form__dropdown'>
                                    <ul>
                                        {
                                            deliveryMethod.list.map((item, index) => (
                                                <li
                                                    key={`${index}-${item}`}
                                                    onClick={() => setDeliveryMethod(prev => ({ ...prev, isShown: false, current: item }))}
                                                >{item}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }
                        </div>

                        <div className='Ordering__form__input-wrapper select'>
                            <div className='Ordering__form__label'>Склад</div>
                            <input
                                value={warehouse.current}
                                readOnly={true}
                                onClick={() => setWarehouse(prev => ({ ...prev, isShown: true }))}
                                className='long'
                                type='text'
                            />

                            {
                                warehouse.list.length > 0 && warehouse.isShown &&
                                <div className='Ordering__form__dropdown'>
                                    <ul>
                                        {
                                            warehouse.list.map((item, index) => (
                                                <li
                                                    key={`${index}-${item.SiteKey}`}
                                                    onClick={() => setWarehouse(prev => ({
                                                        ...prev,
                                                        current: item.DescriptionRu,
                                                        SiteKey: item.SiteKey,
                                                        isShown: false,
                                                    }))}
                                                >
                                                    {item.DescriptionRu}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>

                    <div className='Ordering__form__group'>
                        <div className='Ordering__form__input-wrapper select'>
                            <div className='Ordering__form__label Ordering__form__group__title'>Оплата</div>
                            <input
                                value={paymentMethod.current}
                                readOnly={true}
                                onClick={() => setPaymentMethod(prev => ({ ...prev, isShown: true }))}
                                type='text'
                            />

                            {
                                paymentMethod.isShown &&
                                <div className='Ordering__form__dropdown'>
                                    <ul>
                                        {
                                            paymentMethod.list.map((item, index) => (
                                                <li
                                                    key={`${index}-${item}`}
                                                    onClick={() => setPaymentMethod(prev => ({
                                                        ...prev,
                                                        isShown: false,
                                                        current: item
                                                    }))}
                                                >
                                                    {item}
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            }

                        </div>
                    </div>

                    <div className='Ordering__form__group'>
                        <button className='Ordering__form__submit-btn'>Оформить заказ</button>
                    </div>
                </div>

                <div className='Ordering__order-list'>
                    <div className='Ordering__order-list__title'>Ваш заказ</div>

                    {
                        basket.map(item => (
                            <AdaptCartItem
                                imgSrc={item.product.imageSrc}
                                name={item.product.name}
                                price={item.product.price}
                                amount={item.amount}
                                totalPrice={item.total_price}
                                changeAmountHandler={(value) => changeAmount(item.id, value)}
                                deleteHandler={() => deleteItem(item.id)}
                            />
                        ))
                    }

                    <div className='Ordering__order-list__delivery-price'>
                        <div className='Ordering__order-list__delivery-price__title'>Доставка</div>
                        <div className='Ordering__order-list__delivery-price__value'>40 грн</div>
                    </div>

                    <div className='Ordering__order-list__total-price'>
                        <div className='Ordering__order-list__total-price__title'>Итого</div>
                        <div className='Ordering__order-list__total-price__value'>{totalPrice} грн</div>
                    </div>
                </div>

            </div>
        </div>
    )
}