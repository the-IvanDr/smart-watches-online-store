import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProductInputs } from '../../redux/actions/adminActions';
import {AdminPannelField} from '../AdminPannel';

export default function ProductDetails() {

    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();

    const inputsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        dispatch(changeProductInputs(fieldName, fieldValue));
    }

    return (
        <AdminPannelField title='Характеристики'>
            <div className='AdminProductCreator__flex-wrapper'>
                <div className='AdminProductCreator__flex-wrapper__item'>
                    <div className='AdminPannel__input-wrapper'>
                        <span>Серия:</span>
                        <input type='text' name='series' value={form.series} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>ОС:</span>
                        <input type='text' name='os' value={form.os} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Совместимость с ОС:</span>
                        <input type='text' name='osCompatibility' value={form.osCompatibility} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Форма часов:</span>
                        <input type='text' name='watchShape' value={form.watchShape} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Материал корпуса:</span>
                        <input type='text' name='bodyMaterial' value={form.bodyMaterial} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Материал ремешка:</span>
                        <input type='text' name='strapMaterial' value={form.strapMaterial} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Цвет корпуса:</span>
                        <input type='text' name='bodyColor' value={form.bodyColor} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Цвет ремешка:</span>
                        <input type='text' name='strapColor' value={form.strapColor} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Тип дисплея:</span>
                        <input type='text' name='displayType' value={form.displayType} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Диагональ дисплея:</span>
                        <input type='text' name='displayDiagonal' value={form.displayDiagonal} onChange={inputsChangeHandler} />
                    </div>
                </div>

                <div className='AdminProductCreator__flex-wrapper__item'> 
                    <div className='AdminPannel__input-wrapper'>
                        <span>Разрешение дисплея:</span>
                        <input type='text' name='displayResolution' value={form.displayResolution} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Мониторинг:</span>
                        <input type='text' name='monitoring' value={form.monitoring} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Датчики:</span>
                        <input type='text' name='sensors' value={form.sensors} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Тип аккумулятора:</span>
                        <input type='text' name='batteryType' value={form.batteryType} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Емкость аккумулятора:</span>
                        <input type='text' name='batteryCapacity' value={form.batteryCapacity} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Время работы в режиме ожидания:</span>
                        <input type='text' name='standbyTime' value={form.standbyTime} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Габариты:</span>
                        <input type='text' name='dimensions' value={form.dimensions} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Вес:</span>
                        <input type='number' step='0.01' name='weight' value={form.weight} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Комплектация:</span>
                        <input type='text' name='equipment' value={form.equipment} onChange={inputsChangeHandler} />
                    </div>

                    <div className='AdminPannel__input-wrapper'>
                        <span>Особенности:</span>
                        <input type='text' name='features' value={form.features} onChange={inputsChangeHandler} />
                    </div>
                </div>
            </div>



            <div className='AdminPannel__input-wrapper'>
                <span>Наличие:</span>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isTouchDisplay' checked={form.isTouchDisplay} onChange={inputsChangeHandler} /> Сенсорный экран
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isReplaceableStrap' checked={form.isReplaceableStrap} onChange={inputsChangeHandler} /> Сменный ремешок
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isStrapLengthAdjusment' checked={form.isStrapLengthAdjusment} onChange={inputsChangeHandler} /> Регулировка длины ремешка
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isMoistureAndDustProtection' checked={form.isMoistureAndDustProtection} onChange={inputsChangeHandler} /> Защита от влаги и пыли
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isPhoneCalls' checked={form.isPhoneCalls} onChange={inputsChangeHandler} /> Телефонные звонки
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isGpsSupport' checked={form.isGpsSupport} onChange={inputsChangeHandler} /> Поддержка GPS
                </div>
            </div>

        </AdminPannelField>
    )
}