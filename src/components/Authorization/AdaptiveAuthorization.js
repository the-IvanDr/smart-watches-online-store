import React, { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';

export default function AdaptiveAuthorization({isActive, closeAuthorization, AuthRef}) {
    const [tabs, setTabs] = useState([true, false]);
    const [isResotrePasswordActive, setIsRestorePasswordActive] = useState(false);

    return (
        <div className={clsx('AdaptiveAuthorization', isActive && 'active')} ref={AuthRef}>
            <div className='AdaptiveAuthorization__title'>
                <button onClick={closeAuthorization}><i className="fa fa-chevron-left" aria-hidden="true" /></button>

                <button className={clsx(tabs[0] && 'active')} onClick={() => setTabs([true, false])}>Вход</button>
                <button className={clsx(tabs[1] && 'active')} onClick={() => setTabs([false, true])}>Регистрация</button>
            </div>

            <div className='AdaptiveAuthorization__inputs'>
                {
                    tabs[0]
                        ? <div className='AdaptiveAuthorization__login'>
                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-at" aria-hidden="true" />
                                <input type='email' placeholder='Эл. почта' />
                            </div>

                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-lock" aria-hidden="true" />
                                <input type='password' placeholder='Пароль' />
                            </div>

                            <button className='AdaptiveAuthorization__submit-btn'>Войти</button>
                            <button
                                className='AdaptiveAuthorization__little-btn'
                                onClick={() => setIsRestorePasswordActive(true)}
                            >
                                Забыли пароль?
                            </button>
                        </div>
                        : <div className='AdaptiveAuthorization__register'>
                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-user" aria-hidden="true" />
                                <input type='text' placeholder='Фамилия' />
                            </div>

                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-user" aria-hidden="true" />
                                <input type='text' placeholder='Имя' />
                            </div>

                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-user" aria-hidden="true" />
                                <input type='text' placeholder='Отчество' />
                            </div>

                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-at" aria-hidden="true" />
                                <input type='email' placeholder='Эл. почта' />
                            </div>

                            <div className='AdaptiveAuthorization__input-wrapper'>
                                <i className="fa fa-lock" aria-hidden="true" />
                                <input type='password' placeholder='Пароль' />
                            </div>
                        </div>
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
        </div>
    )
}