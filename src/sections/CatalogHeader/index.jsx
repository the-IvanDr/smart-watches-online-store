import React from 'react';

import Breadcrumbs from '../../components/Breadcrumbs';


export default function CatalogHeader({title, bannerImgSrc}) {
    return (
        <div className='CatalogHeader'>
            <div className='CatalogHeader__wrapp'>
                <h3 className='CatalogHeader__title'>{title}</h3>
                <Breadcrumbs />
            </div>
            <div className='CatalogHeader__image'>
                <img src={bannerImgSrc} alt='catalog-header' />
            </div>
        </div>
    )
}