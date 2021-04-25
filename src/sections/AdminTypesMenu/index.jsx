import React from 'react';
import { useSelector } from 'react-redux';

import AdminTypesList from '../../components/AdminTypesList';
import AdminTypesCreator from '../../components/AdminTypesCreator';
import AdminTypeView from './../../components/AdminTypeView/index';


export default function AdminTypesMenu(){

    const tabs = useSelector(state => state.admin.types.tabs);

    return (
        <div className='AdminTypesMenu'>
            {tabs.list && <AdminTypesList />}
            {tabs.createForm && <AdminTypesCreator />}
            {tabs.view && <AdminTypeView />}
        </div>
    )
}