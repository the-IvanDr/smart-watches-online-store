import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BrandActions } from './../../redux/actions/adminActions';

import { PhotoLoadButton, AdminPannelField, AdminPannelPhotoListItem, AdminPannelPhotoList, AdminInputWrapper, SubmitButton, ReturnButton } from './../AdminPannel';


export default function AdminBrandCreator() {

    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.brands.createForm);
    const dispatch = useDispatch();


    const submitHandler = () => {
        dispatch(BrandActions.create(jwt, form));
    }


    const nameChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        dispatch(BrandActions.changeInputs(fieldName, fieldValue));
    }

    const logoUploadHandler = (event) => {
        const file = event.target.files[0];
        dispatch(BrandActions.uploadImage(jwt, file));
    }

    const logoRemoveHandler = () => {
        dispatch(BrandActions.removeImage(jwt, form.photo));
    }


    return (
        <div className='AdminBrandCreator'>
            <AdminPannelField>
                <ReturnButton onClick={() => dispatch(BrandActions.openList())} />
            </AdminPannelField>
            <AdminPannelField title='Логотип бренда'>
                <PhotoLoadButton inputId='brand-logo-loader' onChange={logoUploadHandler} />
                {
                    !!form.photo.length &&
                    <AdminPannelPhotoList>
                        <AdminPannelPhotoListItem onRemove={logoRemoveHandler} imgSrc={form.photo} />
                    </AdminPannelPhotoList>
                }
            </AdminPannelField>

            <AdminPannelField title='Название бренда'>
                <AdminInputWrapper type='text' name='name' value={form.name} onChange={nameChangeHandler} />
            </AdminPannelField>

            <AdminPannelField>
                <SubmitButton title='Отправить' onClick={submitHandler} />
            </AdminPannelField>
        </div>
    )
}