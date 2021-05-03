import React from 'react';
import clsx from 'clsx';

export default function Checkbox({ title, checked, onClick }) {
    return (
        <>
            <div className={clsx('Checkbox', checked && 'checked')} onClick={onClick}>
                <span className='Checkbox__box' />
                <span className='Checkbox__title'>{title}</span>                
            </div>
        </>
    )
}