import React from 'react';
import clsx from 'clsx';

import FullFilter from './FullFilter.js';
import AdaptiveFilter from './AdaptiveFilter.js';


export default function Filter() {
    return (
        <>
            <FullFilter />
            <AdaptiveFilter />
        </>
    )
}