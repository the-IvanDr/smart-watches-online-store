import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrandActions } from './../../redux/actions/adminActions';

import AdminBrandCreator from '../../components/AdminBrandCreator';
import AdminBrandList from '../../components/AdminBrandList';
import AdminBrandView from '../../components/AdminBrandView';


export default function AdminBrandsMenu() {

    const tabs = useSelector(state => state.admin.brands.tabs);

    return (
        <div className='AdminBrandsMenu'>
            
            {tabs.list && <AdminBrandList />}
            {tabs.view && <AdminBrandView />}
            {tabs.createForm && <AdminBrandCreator />}
        </div>
    )
}