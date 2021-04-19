import React, { useState, useEffect } from 'react';

import AdminProductCreator from '../../components/AdminProductCreator';


export default function AdminProductsMenu() {
    return (
        <div className='AdminProductsMenu'>
            <AdminProductCreator />
        </div>
    );
}