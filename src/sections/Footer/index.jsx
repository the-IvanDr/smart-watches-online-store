import React from 'react';

export default function Footer(props) {
    return (
        <footer className='Footer'>
            <div className='Footer__header'>
                <div className='Footer__header__logo'>
                    <img src='../assets/images/header/logo.jpg' alt='TimeShop' />
                </div>
                <div className='Footer__header__copyright'>
                    <span>© 2018-2021</span>
                    <span>Интернет-магазин TimeShop - смарт-часы и аксессуары</span>
                </div>
                <div className='Footer__header__payment'>
                    <span>Принимаем к оплате</span>
                    <div className='Footer__header__payment__wrapper'>
                        <a href='/'><img src='../assets/images/payment/visa-mastercard.jpg' alt='visa-mastercard' /></a>
                        <a href='/'><img src='../assets/images/payment/privat.jpg' alt='privat-bank' /></a>
                    </div>
                </div>

                <div className='Footer__header__mobile-version'>
                    <a href='/'>
                        <i aria-hidden className="fas fa-mobile-alt" />
                        Мобильная версия
                    </a>
                </div>
            </div>

            <div className='Footer__catalog'>
                <div className='Footer__title'>Каталог</div>
                <ul>
                    <li><a href='/'>Мужские</a></li>
                    <li><a href='/'>Женские</a></li>
                    <li><a href='/'>Детские</a></li>
                    <li><a href='/'>Аксессуары</a></li>
                    <li><a href='/'>Бренды</a></li>
                </ul>
            </div>

            <div className='Footer__for-clients'>
                <div className='Footer__title'>Клиентам</div>
                <ul>
                    <li><a href='/'>Вход в личный кабинет</a></li>
                    <li><a href='/'>О нас</a></li>
                    <li><a href='/'>Оплата и доставка</a></li>
                    <li><a href='/'>Обмен и возврат</a></li>
                    <li><a href='/'>Контактная информация</a></li>
                    <li><a href='/'>Блог</a></li>
                </ul>
                <div className='Footer__for-clients__social'>
                    <span>Мы в соцсетях</span>
                    <div className='Footer__for-clients__social__wrapper'>
                        <a href='/'><i aria-hidden className="fab fa-vk" /></a>
                        <a href='/'><i aria-hidden className="fab fa-facebook-f" /></a>
                        <a href='/'><i aria-hidden className="fab fa-twitter" /></a>
                        <a href='/'><i aria-hidden className="fab fa-instagram" /></a>
                    </div>
                </div>
            </div>

            <div className='Footer__contacts'>
                <div className='Footer__title'>Контактная информация</div>
                <div className='Footer__contacts__wrapper'>
                    <div className='Footer__contacts__tel'>
                        <i aria-hidden className="fas fa-phone-alt" />
                        <a href='tel:+380500000000'>044 000-00-00</a>
                        <a href='tel:+380500000000'>095 000-00-00</a>
                        <a href='/'>Перезвонить вам?</a>
                    </div>
                    <div className='Footer__contacts__msg'>
                        <span>
                            <i aria-hidden className="fab fa-whatsapp" />
                            <a href='/'>whats-app</a>
                        </span>
                        <span>
                            <i aria-hidden className="fab fa-telegram" />
                            <a href='/'>telegram</a>
                        </span>
                        <span>
                            <i aria-hidden className="fab fa-skype" />
                            <a href='/'>skype</a>
                        </span>
                        <span>
                            <i aria-hidden className="fas fa-envelope" />
                            <a href='/'>mail@mail.com</a>
                        </span>
                        <span>
                            <i aria-hidden className="fas fa-map-marker-alt" />
                            Киев, ул.Крещатик
                            <a href='/'>Карта проезда</a>
                        </span>
                    </div>
                </div>
            </div>

            <div className='Footer__adaptive-for-mobile'>
                <div className='Footer__adaptive-for-mobile__tel'>
                    <a href='tel:+380500000000'>044 000-00-00</a>
                    <a href='tel:+380500000000'>095 000-00-00</a>
                </div>
                <a href='/' className='Footer__adaptive-for-mobile__contacts'>Контактная информация</a>
                <div className='Footer__adaptive-for-mobile__cop'>© 2014 — 2021</div>
            </div>
        </footer>
    )
}