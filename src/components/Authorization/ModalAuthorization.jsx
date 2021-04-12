import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { RegChangeHandler, LogChangeHandler } from '../../redux/actions/inputsActions';
import { login, registration } from './../../redux/actions/accountActions';


export default function Authorization({ isActive, toggleAuthorization }) {
    const [tabs, setTabs] = useState([true, false]);
    const [isRestorePasswordActive, setRestorePasswordActive] = useState(false);

    const dispatch = useDispatch();
    const registerInputs = useSelector(state => state.auth.inputs.registerFields);
    const loginInputs = useSelector(state => state.auth.inputs.loginFields);


    const RegSubmitHandler = () => {
        dispatch(registration(registerInputs));
    }


    // Close modal and turn off the "Resotore password menu"
    const closeAuthorization = () => {
        setRestorePasswordActive(false);
        toggleAuthorization();
    }

    // LOGIN TAB COMOPNENT
    const LoginTab = (
        <div className='Authorization__login'>
            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Эл. почта</div>
                <input name='email' type='email' value={loginInputs.email} onChange={(ev) => dispatch(LogChangeHandler(ev))} />
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Пароль</div>
                <input name='password' type='password' value={loginInputs.password} onChange={(ev) => dispatch(LogChangeHandler(ev))} />
            </div>

            <div className='Authorization__buttons-wrapper'>
                <button className='Authorization__submit-btn'>
                    Войти
                </button>

                <button
                    className='Authorization__little-btn'
                    onClick={() => setRestorePasswordActive(true)}
                >
                    Забыли пароль?
                </button>
            </div>
        </div>
    );

    // REGISTRATION TAB COMPONENT
    const RegisterTab = (
        <div className='Authorization__register'>
            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Фамилия</div>
                <input className={clsx(registerInputs.errors.lName && 'error')} name='lName' type='text' value={registerInputs.lName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerInputs.errors.lName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Имя</div>
                <input className={clsx(registerInputs.errors.fName && 'error')} name='fName' type='text' value={registerInputs.fName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerInputs.errors.fName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label'>Отчество</div>
                <input className={clsx(registerInputs.errors.mName && 'error')} name='mName' type='text' value={registerInputs.mName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerInputs.errors.mName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Эл. почта</div>
                <input className={clsx(registerInputs.errors.email && 'error')} name='email' type='email' value={registerInputs.email} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerInputs.errors.email}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Пароль</div>
                <input className={clsx(registerInputs.errors.password && 'error')} name='password' type='password' value={registerInputs.password} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerInputs.errors.password}</p>
            </div>


            <div className='Authorization__buttons-wrapper'>
                <button
                    className='Authorization__submit-btn'
                    onClick={RegSubmitHandler}
                >
                    Зарегистрироваться
                </button>
            </div>
        </div>
    );

    return (
        <div className={clsx('Authorization', isActive && 'active')}>
            <div className='Authorization__overflow-wrapper'>
                {/* ================= CLOSE BUTTON ================== */}
                <button className='Authorization__close-btn' onClick={closeAuthorization}>✖</button>

                <div className={clsx('Authorization__wrapper', isRestorePasswordActive && 'disable')}>
                    {/* ====================== HEADER START ===================== */}
                    <div className='Authorization__header'>
                        {/* ====================== TABS BUTTONS START ===================== */}
                        <div className='Authorization__tabs'>
                            <div
                                className={clsx('Authorization__tabs__item', tabs[0] && 'active')}
                                onClick={() => setTabs([true, false])}
                            >
                                Вход
                                </div>
                            <div
                                className={clsx('Authorization__tabs__item', tabs[1] && 'active')}
                                onClick={() => setTabs([false, true])}
                            >
                                Регистрация
                                </div>
                        </div>
                        {/* ====================== TABS BUTTONS END ===================== */}

                        {/* ====================== LOGIN WITH BUTTONS START ===================== */}
                        <div className='Authorization__login-with'>
                            <div className='Authorization__login-with__title'>
                                Войти с помощью
                                </div>

                            <div className='Authorization__login-with__list'>
                                <button className='Authorization__login-with__facebook'>
                                    <i className="fa fa-facebook-square" aria-hidden="true" />
                                </button>

                                <button className='Authorization__login-with__google'>
                                    <i className="fa fa-google-plus-square" aria-hidden="true" />
                                </button>
                            </div>
                        </div>
                        {/* ====================== LOGIN WITH BUTTONS END ===================== */}

                    </div>
                    {/* ====================== HEADER END ===================== */}

                    {/* ====================== TABS CONTENT START ===================== */}
                    <div className='Authorization__tabs-content'>
                        {
                            tabs[0]
                                ? LoginTab
                                : RegisterTab
                        }
                    </div>
                    {/* ====================== TABS CONTENT END ===================== */}

                </div>

                {/* ====================== RESTORE PASSWORD MENU START ===================== */}
                <div className={clsx('Authorization__restore-password', isRestorePasswordActive && 'active')}>
                    <div className='Authorization__restore-password__header'>
                        Восстановление пароля
                        </div>
                    <p>Введите адрес электронной почты, который вы указывали при регистрации. Мы отправим письмо с информацией для восстановления пароля.</p>
                    {/* <Input type='email' label='Эл. почта' /> */}
                    <div className='Authorization__buttons-wrapper'>
                        <button className='Authorization__submit-btn'>
                            Восстановить
                            </button>
                    </div>
                </div>
                {/* ====================== RESTORE PASSWORD MENU END ===================== */}

            </div>
        </div>
    )
}