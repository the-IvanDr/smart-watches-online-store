import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from '../../redux/actions/adminActions';
import { AdminPannelField, AdminInputWrapper, AdminCheckboxListWrapper, AdminCheckboxWrapper } from '../AdminPannel';

export default function ProductDetails() {

    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();

    const inputsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        dispatch(ProductActions.changeInputs(fieldName, fieldValue));
    }

    return (
        <AdminPannelField title='Характеристики'>
            <div className='AdminProductCreator__flex-wrapper'>
                <div className='AdminProductCreator__flex-wrapper__item'>
                    <AdminInputWrapper title='Серия' type='text' name='series' value={form.series} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='ОС' type='text' name='os' value={form.os} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Совместимость с ОС' type='text' name='osCompatibility' value={form.osCompatibility} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Форма часов' type='text' name='watchShape' value={form.watchShape} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Материал корпуса' type='text' name='bodyMaterial' value={form.bodyMaterial} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Материал ремешка' type='text' name='strapMaterial' value={form.strapMaterial} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Цвет корпуса' type='text' name='bodyColor' value={form.bodyColor} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Цвет ремешка' type='text' name='strapColor' value={form.strapColor} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Тип дисплея' type='text' name='displayType' value={form.displayType} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Диагональ дисплея' type='text' name='displayDiagonal' value={form.displayDiagonal} onChange={inputsChangeHandler} />
                </div>

                <div className='AdminProductCreator__flex-wrapper__item'>
                    <AdminInputWrapper title='Разрешение дисплея' type='text' name='displayResolution' value={form.displayResolution} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Мониторинг' type='text' name='monitoring' value={form.monitoring} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Датчики' type='text' name='sensors' value={form.sensors} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Тип аккумулятора' type='text' name='batteryType' value={form.batteryType} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Емкость аккумулятора' type='text' name='batteryCapacity' value={form.batteryCapacity} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Время работы в режиме ожидания' type='text' name='standbyTime' value={form.standbyTime} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Габариты' type='text' name='dimensions' value={form.dimensions} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Вес' type='number' step='0.01' name='weight' value={form.weight} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Комплектация' type='text' name='equipment' value={form.equipment} onChange={inputsChangeHandler} />
                    <AdminInputWrapper title='Особенности' type='text' name='features' value={form.features} onChange={inputsChangeHandler} />
                </div>
            </div>

            <AdminCheckboxListWrapper title='Наличие'>
                <AdminCheckboxWrapper title='Сенсорный экран' name='isTouchDisplay' checked={form.isTouchDisplay} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Сменный ремешок' name='isReplaceableStrap' checked={form.isReplaceableStrap} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Регулировка длины ремешка' name='isStrapLengthAdjusment' checked={form.isStrapLengthAdjusment} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Защита от влаги и пыли' name='isMoistureAndDustProtection' checked={form.isMoistureAndDustProtection} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Телефонные звонки' name='isPhoneCalls' checked={form.isPhoneCalls} onChange={inputsChangeHandler} />
                <AdminCheckboxWrapper title='Поддержка GPS' name='isGpsSupport' checked={form.isGpsSupport} onChange={inputsChangeHandler} />
            </AdminCheckboxListWrapper>

        </AdminPannelField>
    )
}