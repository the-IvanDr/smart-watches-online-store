import React from 'react';

export default function Breadcrumbs({ style }) {
    return (
        <div className='Breadcrumbs' style={style}>
            <a href='/'>Главная</a>
            <i aria-hidden className="fas fa-chevron-right" />
            <span>Мужские</span>
        </div>
    )
}