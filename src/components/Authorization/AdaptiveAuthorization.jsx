import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

import { useDispatch, useSelector } from 'react-redux';
import { RegChangeHandler, LogChangeHandler } from '../../redux/actions/inputsActions';
import { registration, login } from '../../redux/actions/accountActions';


export default function AdaptiveAuthorization({ isActive, closeAuthorization, AuthRef }) {
    const [tabs, setTabs] = useState([true, false]);
    const [isResotrePasswordActive, setIsRestorePasswordActive] = useState(false);

    const dispatch = useDispatch();
    const registerForm = useSelector(state => state.auth.forms.register);
    const loginForm = useSelector(state => state.auth.forms.login);


    const RegSubmitHandler = () => {
        dispatch(registration(registerForm));
    }

    const LogSubmitHandler = () => {
        dispatch(login(loginForm));
    }



    // LOGIN TAB COMPONENT
    const LoginTab = (
        <div className='AdaptiveAuthorization__login'>
            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-at" aria-hidden="true" />
                <input className={clsx(loginForm.errors.email && 'error')} name='email' type="email" placeholder="Эл. почта"
                    value={loginForm.email} onChange={(ev) => dispatch(LogChangeHandler(ev))}
                />
                <p>{loginForm.errors.email}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-lock" aria-hidden="true" />
                <input className={clsx(loginForm.errors.password && 'error')} name='password' type="password" placeholder="Пароль"
                    value={loginForm.password} onChange={(ev) => dispatch(LogChangeHandler(ev))}
                />
                <p>{loginForm.errors.password}</p>
            </div>

            <button
                className='AdaptiveAuthorization__submit-btn'
                onClick={LogSubmitHandler}
            >
                Войти
            </button>
            <button
                className='AdaptiveAuthorization__little-btn'
                onClick={() => setIsRestorePasswordActive(true)}
            >
                Забыли пароль?
            </button>
        </div>
    );

    // REGISTRATION TAB COMPONENT
    const RegisterTab = (
        <div className='AdaptiveAuthorization__register'>

            {
                registerForm.errors.main &&
                <div className='Authorization__main-error-msg'>{registerForm.errors.main}</div>
            }

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-user" aria-hidden="true" />
                <input className={clsx(registerForm.errors.lName && 'error')} name='lName' type="text" placeholder="Фамилия"
                    value={registerForm.lName} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.lName}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-user" aria-hidden="true" />
                <input className={clsx(registerForm.errors.fName && 'error')} name='fName' type="text" placeholder="Имя"
                    value={registerForm.fName} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.fName}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-user" aria-hidden="true" />
                <input className={clsx(registerForm.errors.mName && 'error')} name='mName' type="text" placeholder="Отчество"
                    value={registerForm.mName} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.mName}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-at" aria-hidden="true" />
                <input className={clsx(registerForm.errors.email && 'error')} name='email' type="email" placeholder="Эл. почта"
                    value={registerForm.email} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.email}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-lock" aria-hidden="true" />
                <input className={clsx(registerForm.errors.password && 'error')} name='password' type="password" placeholder="Пароль"
                    value={registerForm.password} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.password}</p>
            </div>

            <div className='AdaptiveAuthorization__input-wrapper'>
                <i className="fa fa-lock" aria-hidden="true" />
                <input className={clsx(registerForm.errors.confirmPassword && 'error')} name='confirmPassword' type="password" placeholder="Повторите пароль"
                    value={registerForm.confirmPassword} onChange={(ev) => dispatch(RegChangeHandler(ev))}
                />
                <p>{registerForm.errors.confirmPassword}</p>
            </div>

            <button
                className='AdaptiveAuthorization__submit-btn'
                onClick={RegSubmitHandler}
            >
                Зарегистрироваться
            </button>
        </div>
    )

    return (
        <div className={clsx('AdaptiveAuthorization', isActive && 'active')} ref={AuthRef}>
            {/* ==================== TITLE START ===================== */}
            <div className='AdaptiveAuthorization__title'>
                <button onClick={closeAuthorization}><i className="fa fa-chevron-left" aria-hidden="true" /></button>

                <button className={clsx(tabs[0] && 'active')} onClick={() => setTabs([true, false])}>Вход</button>
                <button className={clsx(tabs[1] && 'active')} onClick={() => setTabs([false, true])}>Регистрация</button>
            </div>
            {/* ==================== TITLE END ===================== */}


            {/* ==================== INPUTS START ===================== */}
            <div className='AdaptiveAuthorization__inputs'>
                {
                    tabs[0]
                        ? LoginTab
                        : RegisterTab
                }

                <button className='AdaptiveAuthorization__login-with -facebook'>
                    <i className="fa fa-facebook-square" aria-hidden="true" />
                    Войти через Facebook
                </button>
                <button className='AdaptiveAuthorization__login-with -google'>
                    <i className="fa fa-google" aria-hidden="true" />
                    Войти через Google
                </button>

            </div>
            {/* ==================== INPUTS END ===================== */}

            {/* ==================== RESTORE PASSWORD MENU START ===================== */}
            <div className={clsx('AdaptiveAuthorization__restore-password', isResotrePasswordActive && 'active')}>
                <div className='AdaptiveAuthorization__restore-password__title'>
                    <button onClick={() => setIsRestorePasswordActive(false)}>
                        <i className="fa fa-chevron-left" aria-hidden="true" />
                    </button>
                    Восстановление пароля
                </div>

                <div className='AdaptiveAuthorization__restore-password__wrapper'>
                    <p>Введите адрес электронной почты, который вы указывали при регистрации. Мы отправим письмо с информацией для восстановления пароля.</p>
                    <div className='AdaptiveAuthorization__input-wrapper'>
                        <i className="fa fa-at" aria-hidden="true" />
                        <input type='email' placeholder='Эл. почта' />
                    </div>
                    <button className='AdaptiveAuthorization__submit-btn'>Восстановить</button>
                </div>
            </div>
            {/* ==================== RESTORE PASSWORD MENU END ===================== */}

            {/* ====================== REGISTRATION SUCCESS MESSAGE START ===================== */}
            <div className={clsx('AdaptiveAuthorization__registration-success-block', registerForm.success && 'active')}>
                <div className='AdaptiveAuthorization__registration-success-block__title'>
                    <button onClick={closeAuthorization}>
                        <i className="fa fa-chevron-left" aria-hidden="true" />
                    </button>
                    Вы зарегистрированы
                </div>
                <p>Вы успешно зарегистрированы. Пожалуйста, подтвердите свой e-mail адресс. На указанный вами e-mail адресс было отправленно письмо для подтверждения.</p>
            </div>
            {/* ====================== REGISTRATION SUCCESS MESSAGE END ===================== */}

        </div>
    )
}