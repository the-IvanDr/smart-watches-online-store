import React from 'react';
import clsx from 'clsx';

export default function Substrate({ isActive, onClick }) {
    return <div
        className={clsx('Substrate', isActive && 'active')}
        onClick={onClick}
    />
}