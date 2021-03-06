import React from 'react';

import Link from 'next/link';

export default function Promo() {
    return (
        <div className='Promo'>
            <div className='Promo__yellow-banner'>
                <div className='Promo__yellow-banner__image'>
                    <img src='./assets/images/promo-watches.png' alt='smart-watch' />
                </div>

                <div className='Promo__yellow-banner__header'>
                    <p>Смарт время <br /> смарт-часы!</p>
                    <Link href='/catalog'><a className='PromoBtn'>Купить</a></Link>
                </div>
            </div>
            <div className='Promo__blue-banner'>
                <img src='./assets/images/blue-banner.jpg' alt='banner' />
            </div>
        </div>
    )
}