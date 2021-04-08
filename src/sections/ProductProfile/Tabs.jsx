import React, { useState, useRef } from 'react';
import clsx from 'clsx';
import Link from 'next/link';

export default function Tabs() {

    const [tabs, setTabs] = useState([
        {
            active: true,
            elem: useRef()
        },
        {
            active: false,
            elem: useRef()
        },
        {
            active: false,
            elem: useRef()
        }
    ]);


    const tabsToggleHandler = (tabIndex) => {
        if (tabs[tabIndex].active) return;

        const newTabs = [...tabs];
        newTabs.map(tab => tab.active = false);
        newTabs[tabIndex].active = true;

        setTabs(newTabs);
    }

    return (
        <div className='ProductProfile__tabs'>

            {/* ========= TABS-BUTTONS START ========= */}
            <div className='ProductProfile__tabs__titles'>
                <div onClick={() => tabsToggleHandler(0)} className={clsx('ProductProfile__tabs__titles__item', tabs[0].active && 'active')}>Доставка</div>
                <div onClick={() => tabsToggleHandler(1)} className={clsx('ProductProfile__tabs__titles__item', tabs[1].active && 'active')}>Оплата</div>
                <div onClick={() => tabsToggleHandler(2)} className={clsx('ProductProfile__tabs__titles__item', tabs[2].active && 'active')}>Гарантия</div>
            </div>
            {/* ========= TABS-BUTTONS END ========= */}

            {/* ========= TABS-CONTENT#1 START ========= */}
            <div className={clsx('ProductProfile__tabs__content', tabs[0].active && 'active')}>
                <ul>
                    <li>Новой почтой по Украине  — 30 грн.</li>
                    <li>Курьером к двери по Киеву — 40 грн.</li>
                </ul>
                <Link href='/'>
                    <a>Подробнее о доставке</a>
                </Link>
            </div>
            {/* ========= TABS-CONTENT#1 END ========= */}

            {/* ========= TABS-CONTENT#2 START ========= */}
            <div className={clsx('ProductProfile__tabs__content', tabs[1].active && 'active')}>
                <ul>
                    <li>Наличными при получении.</li>
                    <li>Кредитной картой в privat24, LiqPay.</li>
                    <li>Через кассу или терминал самообслуживания Приватбанк.</li>
                </ul>
            </div>
            {/* ========= TABS-CONTENT#2 END ========= */}

            {/* ========= TABS-CONTENT#3 START ========= */}
            <div className={clsx('ProductProfile__tabs__content', tabs[2].active && 'active')}>
                <p>Гарантия от производителя 12 месяцев</p>
            </div>
            {/* ========= TABS-CONTENT#3 END ========= */}

        </div>
    )
}