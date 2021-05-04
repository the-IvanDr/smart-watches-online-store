import React, { useState } from 'react';
import clsx from 'clsx';

export default function ProductDetails({ details }) {
    const [isSpoilerOpen, setSpoilerOpen] = useState(false);

    return (
        <div className='ProductProfile__details'>
            <div className='ProductProfile__details__spoiler' onClick={() => setSpoilerOpen(prev => !prev)} onSelect={(ev) => ev.preventDefault()}>
                Характеристики
                <span className={clsx(isSpoilerOpen && 'open')} />
            </div>

            <div className={clsx('ProductProfile__details__list', isSpoilerOpen && 'open')}>
                {
                    details.series && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Серия:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.series}</div>
                    </div>
                }
                {
                    details.os && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>ОС:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.os}</div>
                    </div>
                }
                {
                    details.os_compatibility && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Совместимость ОС:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.os_compatibility}</div>
                    </div>
                }
                {
                    details.watch_shape && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Форма часов:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.watch_shape}</div>
                    </div>
                }
                {
                    details.body_material && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Материал корпуса:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.body_material}</div>
                    </div>
                }
                {
                    details.strap_material && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Материал ремешка:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.strap_material}</div>
                    </div>
                }
                {
                    details.body_color && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Цвет корпуса:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.body_color}</div>
                    </div>
                }
                {
                    details.strap_color && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Цвет ремешка:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.strap_color}</div>
                    </div>
                }
                {
                    details.display_type && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Тип дисплея:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.display_type}</div>
                    </div>
                }
                {
                    details.display_diagonal && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Диагональ дисплея:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.display_diagonal}</div>
                    </div>
                }
                {
                    details.display_resolution && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Разрешение дисплея:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.display_resolution}</div>
                    </div>
                }
                {
                    details.monitoring && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Мониторинг:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.monitoring}</div>
                    </div>
                }
                {
                    details.sensors && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Датчики:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.sensors}</div>
                    </div>
                }
                {
                    details.battery_type && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Тип аккумулятора:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.battery_type}</div>
                    </div>
                }
                {
                    details.battery_capacity && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Емкость аккумулятора:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.battery_capacity}</div>
                    </div>
                }
                {
                    details.standby_time && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Время работы в режиме ожидания:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.standby_time}</div>
                    </div>
                }
                {
                    details.dimensions && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Габариты:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.dimensions}</div>
                    </div>
                }
                {
                    details.weight && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Вес:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.weight}</div>
                    </div>
                }
                {
                    details.equipment && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Комплектация:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.equipment}</div>
                    </div>
                }
                {
                    details.features && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Особенности:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.features}</div>
                    </div>
                }
                {
                    details.is_touch_display && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Сенсорный дисплей:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_touch_display && "Да"}</div>
                    </div>
                }
                {
                    details.is_replaceable_strap && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Сменный ремешок:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_replaceable_strap}</div>
                    </div>
                }
                {
                    details.is_strap_length_adjusment && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Регулировка длины ремешка:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_strap_length_adjusment && "Да"}</div>
                    </div>
                }
                {
                    details.is_moisture_and_dust_protection && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Защита от влаги и пыли:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_moisture_and_dust_protection && "Да"}</div>
                    </div>
                }
                {
                    details.is_phone_calls && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Телефонные звонки:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_phone_calls  && "Да"}</div>
                    </div>
                }
                {
                    details.is_gps_support && <div className='ProductProfile__details__list__item'>
                        <div className='ProductProfile__details__list__item__title'>Поддержка GPS:</div>
                        <div className='ProductProfile__details__list__item__value'>{details.is_gps_support  && "Да"}</div>
                    </div>
                }
            </div>
        </div>
    )
}