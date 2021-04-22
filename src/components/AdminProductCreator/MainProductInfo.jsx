import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProductInputs } from '../../redux/actions/adminActions';

export default function MainProductInfo() {
    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();


    const inputsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        dispatch(changeProductInputs(fieldName, fieldValue));
    }

    const selectorsChangeHandler = (event) => {
        const fieldName = event.target.name;
        const selectedIndex = event.target.options.selectedIndex;
        const fieldValue = [...form[fieldName]];
        fieldValue.forEach((item, index) => {
            if(index === selectedIndex) item.active = true;
            else item.active = false;
        });

        dispatch(changeProductInputs(fieldName, fieldValue));
    }


    return (
        <div className='AdminPannel__field'>
            <div className='AdminPannel__field__title'>Основное:</div>

            <hr />

            <div className='AdminPannel__input-wrapper'>
                <span>Название:</span>
                <input type='text' name='title' value={form.title} onChange={inputsChangeHandler} />
            </div>

            <div className='AdminPannel__input-row-group'>
                <div className='AdminPannel__input-wrapper'>
                    <span>Цена (грн):</span>
                    <input type='number' name='price' value={form.price} onChange={inputsChangeHandler} />
                </div>
                <div className='AdminPannel__input-wrapper'>
                    <span>Скидка %:</span>
                    <input type='number' name='discount' value={form.discount} onChange={inputsChangeHandler} />
                </div>
            </div>


            <div style={{ color: 'red' }}>ДОДЕЛАТЬ (выбор типа, бренда)!</div>
            <div className='AdminPannel__input-row-group'>
                <div className='AdminPannel__input-wrapper'>
                    <span>Тип:</span>
                    <select>
                        <option>Часы</option>
                        <option>Ремень для часов</option>
                    </select>
                </div>

                <div className='AdminPannel__input-wrapper'>
                    <span>Бренд:</span>
                    <select>
                        <option>Xiaomi</option>
                        <option>Samsung</option>
                        <option>Apple</option>
                        <option>Microsoft</option>
                    </select>
                </div>

                <div className='AdminPannel__input-wrapper'>
                    <span>Характер:</span>
                    <select name='character' value={form.character.find(item => item.active).name} onChange={selectorsChangeHandler}>
                        <option value={form.character[0].name} >{form.character[0].name}</option>
                        <option value={form.character[1].name} >{form.character[1].name}</option>
                        <option value={form.character[2].name} >{form.character[2].name}</option>
                    </select>
                </div>
            </div>

            <div className='AdminPannel__input-wrapper'>
                <span>Маркеры:</span>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isHit' checked={form.isHit} onChange={inputsChangeHandler} /> Хит
                </div>
                <div className='AdminPannel__input-wrapper__checkbox'>
                    <input type='checkbox' name='isNovelty' checked={form.isNovelty} onChange={inputsChangeHandler} /> Новинка
                </div>
            </div>
        </div>
    )
}