import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { uploadProductImage, removeProductImage } from '../../redux/actions/adminActions';
import { PhotoLoadButton } from '../AdminPannel';

export default function ProductPhotoSelector() {
    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();


    const uploadProductImageHandler = (event) => {
        const file = event.target.files[0];
        dispatch(uploadProductImage(jwt, file));
    }

    const removeProductImageHandler = () => {
        dispatch(removeProductImage(jwt, form.mainImageSrc));
    }

    return (
        <div className='AdminPannel__field'>
            <div className='AdminPannel__field__title'>Фото товара:</div>


            <hr />

            <PhotoLoadButton onChange={uploadProductImageHandler} isMultiple={false} inputId={'main-image-loader'} />

            <div className='AdminProductCreator__photos-list'>
                {
                    !!form.mainImageSrc &&

                    <div className='AdminProductCreator__photos-list__item'>
                        <button onClick={removeProductImageHandler}>✖</button>
                        <img src={form.mainImageSrc} alt='main-product-image' />
                    </div>
                }
            </div>
        </div>
    )
}