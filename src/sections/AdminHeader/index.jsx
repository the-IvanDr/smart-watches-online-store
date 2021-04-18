import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeTabs } from './../../redux/actions/adminActions';

import clsx from 'clsx';

import Link from 'next/link';


export default function AdminHeader() {
    const tabs = useSelector(state => state.admin.header.tabs);
    const dispatch = useDispatch();


    const changeTabHandler = (tabIndex) => {
        dispatch(changeTabs(tabIndex));
    }


    return (
        <div className='AdminHeader'>
            <div className='AdminHeader__top'>
                <div className='AdminHeader__title'>
                    Time - Shop Admin
                </div>
                <Link href='/'><a>На сайт</a></Link>
            </div>
            <div className='AdminHeader__bottom'>
                <div className='AdminHeader__fields'>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler(0)} className={clsx(tabs[0] && 'active')}>Пользователи</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler(1)} className={clsx(tabs[1] && 'active')}>Товары</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler(2)} className={clsx(tabs[2] && 'active')}>Заказы</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler(3)} className={clsx(tabs[3] && 'active')}>Бренды</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler(4)} className={clsx(tabs[4] && 'active')}>Типы</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}