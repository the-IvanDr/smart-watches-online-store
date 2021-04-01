import React from 'react';

import Breadcrumbs from '../../components/Breadcrumbs';


export default function CatalogHeader() {
    return (
        <div className='CatalogHeader'>
            <div className='CatalogHeader__wrapp'>
                <h3 className='CatalogHeader__title'>Мужские</h3>
                <Breadcrumbs />
            </div>
            <div className='CatalogHeader__image'>
                <img src='assets/images/catalogs-headers/man-watches.png' alt='catalog-header' />
            </div>
        </div>
    )
}