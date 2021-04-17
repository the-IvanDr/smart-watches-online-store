import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { RegChangeHandler, LogChangeHandler } from '../../redux/actions/inputsActions';
import { login, registration } from './../../redux/actions/accountActions';


export default function Authorization({ isActive, toggleAuthorization }) {
    const [tabs, setTabs] = useState([true, false]);
    const [isRestorePasswordActive, setRestorePasswordActive] = useState(false);

    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.auth.forms.register);
    const loginForm = useSelector(state => state.auth.forms.login);


    const RegSubmitHandler = () => {
        dispatch(registration({ ...registerForm }));
    }

    const LogSubmitHandler = () => {
        dispatch(login({ ...loginForm }));
    }


    // Close modal and turn off the "Resotore password menu"
    const closeAuthorization = () => {
        setRestorePasswordActive(false);
        toggleAuthorization();
    }

    // LOGIN TAB COMOPNENT
    const LoginTab = (
        <div className='Authorization__login'>

            {
                loginForm.errors.main &&
                <div className='Authorization__main-error-msg'>{loginForm.errors.main}</div>
            }

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Эл. почта</div>
                <input className={clsx(loginForm.errors.email && 'error')} name='email' type='email' value={loginForm.email} onChange={(ev) => dispatch(LogChangeHandler(ev))} />
                <p>{loginForm.errors.email}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Пароль</div>
                <input className={clsx(loginForm.errors.password && 'error')} name='password' type='password' value={loginForm.password} onChange={(ev) => dispatch(LogChangeHandler(ev))} />
                <p>{loginForm.errors.password}</p>
            </div>

            <div className='Authorization__buttons-wrapper'>
                <button
                    className='Authorization__submit-btn'
                    onClick={LogSubmitHandler}
                >
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

            {
                registerForm.errors.main &&
                <div className='Authorization__main-error-msg'>{registerForm.errors.main}</div>
            }

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Фамилия</div>
                <input className={clsx(registerForm.errors.lName && 'error')} name='lName' type='text' value={registerForm.lName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.lName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Имя</div>
                <input className={clsx(registerForm.errors.fName && 'error')} name='fName' type='text' value={registerForm.fName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.fName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label'>Отчество</div>
                <input className={clsx(registerForm.errors.mName && 'error')} name='mName' type='text' value={registerForm.mName} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.mName}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Эл. почта</div>
                <input className={clsx(registerForm.errors.email && 'error')} name='email' type='email' value={registerForm.email} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.email}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Пароль</div>
                <input className={clsx(registerForm.errors.password && 'error')} name='password' type='password' value={registerForm.password} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.password}</p>
            </div>

            <div className='Authorization__input-wrapper'>
                <div className='Authorization__input-wrapper__label required'>Повтор пароля</div>
                <input className={clsx(registerForm.errors.confirmPassword && 'error')} name='confirmPassword' type='password' value={registerForm.confirmPassword} onChange={(ev) => dispatch(RegChangeHandler(ev))} />
                <p>{registerForm.errors.confirmPassword}</p>
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

                <div className={clsx('Authorization__wrapper', (registerForm.success || isRestorePasswordActive) && 'disable')}>
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

                {/* ====================== REGISTRATION SUCCESS MESSAGE START ===================== */}
                <div className={clsx('Authorization__registration-success-block', registerForm.success && 'active')}>
                    <div className='Authorization__registration-success-block__header'>
                        Вы успешно зарегистрированы
                    </div>
                    <p>Пожалуйста, подтвердите свой e-mail адресс. На указанный вами e-mail адресс было отправленно письмо для подтверждения.</p>
                </div>
                {/* ====================== REGISTRATION SUCCESS MESSAGE END ===================== */}


            </div>
        </div>
    )
}