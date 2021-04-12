import React from 'react';
import clsx from 'clsx';

import FullFilter from './FullFilter.jsx';
import AdaptiveFilter from './AdaptiveFilter.jsx';


export default function Filter() {
    return (
        <>
            <FullFilter />
            <AdaptiveFilter />
        </>
    )
}