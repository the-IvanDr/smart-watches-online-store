import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from '../../redux/actions/adminActions';
import { PhotoLoadButton, AdminPannelField, AdminPannelPhotoList, AdminPannelPhotoListItem } from '../AdminPannel';

export default function ProductPhotoSelector() {
    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();


    const uploadProductImageHandler = (event) => {
        const file = event.target.files[0];
        dispatch(ProductActions.uploadProductImage(jwt, file));
    }

    const removeProductImageHandler = () => {
        dispatch(ProductActions.removeProductImage(jwt, form.mainImageSrc));
    }

    return (
        <AdminPannelField title='Фото товара'>
            <PhotoLoadButton onChange={uploadProductImageHandler} isMultiple={false} inputId={'main-image-loader'} />

            {
                !!form.mainImageSrc &&
                <AdminPannelPhotoList>
                    <AdminPannelPhotoListItem onRemove={removeProductImageHandler} imgSrc={form.mainImageSrc} />
                </AdminPannelPhotoList>
            }
        </AdminPannelField>
    )
}