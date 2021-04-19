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
                        <a onClick={() => changeTabHandler("users")} className={clsx(tabs.users && 'active')}>Пользователи</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler("products")} className={clsx(tabs.products && 'active')}>Товары</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler("orders")} className={clsx(tabs.orders && 'active')}>Заказы</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler("brands")} className={clsx(tabs.brands && 'active')}>Бренды</a>
                    </Link>
                    <Link href='/administrator'>
                        <a onClick={() => changeTabHandler("types")} className={clsx(tabs.types && 'active')}>Типы</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}