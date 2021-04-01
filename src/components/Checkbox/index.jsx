import React from 'react';
import clsx from 'clsx';

export default function Checkbox({ title, checked }) {
    return (
        <>
            <div className={clsx('Checkbox', checked && 'checked')}>
                <span className='Checkbox__box' />
                <span className='Checkbox__title'>{title}</span>                
            </div>
        </>
    )
}