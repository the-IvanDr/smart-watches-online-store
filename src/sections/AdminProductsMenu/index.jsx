import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import AdminProductCreator from '../../components/AdminProductCreator';
import AdminProductList from './../../components/AdminProductList';
import AdminProductView from './../../components/AdminProductView';


export default function AdminProductsMenu() {

    const tabs = useSelector(state => state.admin.products.tabs);

    return (
        <div className='AdminProductsMenu'>
            {tabs.list && <AdminProductList />}
            {tabs.view && <AdminProductView />}
            {tabs.createForm && <AdminProductCreator />}
        </div>
    );
}