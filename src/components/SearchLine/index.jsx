import React, { useState } from 'react';
import clsx from 'clsx';

export default function SearchLine({ isActive, toggleSearchLine }) {
    const [searchString, setSearchString] = useState('');

    const closeBtnHandler = () => {
        if (searchString) setSearchString('');
        else toggleSearchLine();
    }

    return (
        // <div className={`SearchLine ${isActive && 'active'}`}>
        <div className={clsx('SearchLine', isActive && 'active')}>
            <button className='SearchLine__search-btn'><i aria-hidden className="fas fa-search" /></button>
            <input
                type='text'
                placeholder='Поиск по каталогу'
                value={searchString}
                onChange={(ev) => setSearchString(ev.target.value)}
            />
            <button className='SearchLine__close-btn' onClick={closeBtnHandler}>✖</button>
        </div>
    )
}