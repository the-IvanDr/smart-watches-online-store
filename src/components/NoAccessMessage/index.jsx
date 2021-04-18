import Link from 'next/link';
import React from 'react';

export default function NoAccessMessage({title, text}){
    return (
        <div className='NoAccessMessage'>
            <h3>{title}</h3>
            <p>{text}</p>
            <div className='NoAccesMessage__btn-wrapper'>
                <Link href='/'><a>На главную</a></Link>
            </div>
        </div>
    )
}