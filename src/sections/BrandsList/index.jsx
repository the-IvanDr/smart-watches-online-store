import React from 'react'

export default function BrandsList(props) {
    return (
        <section className='BrandsList'>
            <h3 className='BrandsList__title'>Бренды</h3>

            <div className='BrandsList__slider'>
                <ul>
                    <li><a href='/'><img src='./assets/images/brands/apple.png' alt='apple' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/samsung.png' alt='samsung' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/huawei.png' alt='huawei' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/xiaomi.png' alt='xiaomi' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/garmin.png' alt='garmin' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/amazfit.png' alt='amazfit' /></a></li>
                    <li><a href='/'><img src='./assets/images/brands/canyon.png' alt='canyon' /></a></li>
                </ul>
            </div>
        </section>
    )
}

