import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

export default function Authorization({ isActive, toggleAuthorization }) {
    const [tabs, setTabs] = useState([true, false]);
    const [isRestorePasswordActive, setRestorePasswordActive] = useState(false);


    const closeAuthorization = () => {
        setRestorePasswordActive(false);
        toggleAuthorization();
    }


    const Input = ({ label, type, required }) => (
        <div className='Authorization__input-wrapper'>
            <div className={clsx('Authorization__input-wrapper__label', required && 'required')}>{label}</div>
            <input type={type} />
        </div>
    );

    return (
        <>
            <div className={clsx('Authorization', isActive && 'active')}>
                <div className='Authorization__overflow-wrapper'>
                    <button className='Authorization__close-btn' onClick={closeAuthorization}>✖</button>

                    <div className={clsx('Authorization__wrapper', isRestorePasswordActive && 'disable')}>
                        <div className='Authorization__header'>
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
                        </div>

                        <div className='Authorization__tabs-content'>
                            {
                                tabs[0]
                                    ?
                                    <div className='Authorization__login'>
                                        <Input type='email' label='Эл. почта' required />
                                        <Input type='password' label='Пароль' required />

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
                                    :
                                    <div className='Authorization__register'>
                                        <Input type='text' label='Фамилия' required />
                                        <Input type='text' label='Имя' required />
                                        <Input type='text' label='Отчество' />
                                        <Input type='email' label='Эл. почта' required />
                                        <Input type='password' label='Пароль' required />

                                        <div className='Authorization__buttons-wrapper'>
                                            <button className='Authorization__submit-btn'>
                                                Зарегистрироваться
                                            </button>
                                        </div>
                                    </div>
                            }
                        </div>
                    </div>

                    <div className={clsx('Authorization__restore-password', isRestorePasswordActive && 'active')}>
                        <div className='Authorization__restore-password__header'>
                            Восстановление пароля
                        </div>
                        <p>Введите адрес электронной почты, который вы указывали при регистрации. Мы отправим письмо с информацией для восстановления пароля.</p>
                        <Input type='email' label='Эл. почта' />
                        <div className='Authorization__buttons-wrapper'>
                            <button className='Authorization__submit-btn'>
                                Восстановить
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}