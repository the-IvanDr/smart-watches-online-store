import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addProductImage } from '../../redux/actions/adminActions';


export default function ProductPhotoSelector() {
    const productImagePreviewRef = useRef();

    const form = useSelector(state => state.admin.products.createForm);
    const dispatch = useDispatch();


    // After seelcting a product image, read the selected file and send it as src to <img />
    useEffect(() => {
        if (!form.photos.length || typeof form.photos[0] === 'undefined') return;

        const reader = new FileReader();
        reader.onload = (e) => {
            productImagePreviewRef.current.setAttribute('src', e.target.result);
        }

        reader.readAsDataURL(form.photos[0]);

    }, [form]);


    const loadProductImage = (event) => {
        dispatch(addProductImage(event.target.files));
    }

    const PhotoLoadButton = (
        <div className='AdminProductCreator__photo-loader'>
            <input id='load-img' type='file' accept='.jpg, .jpeg, .png, .webp' multiple onChange={loadProductImage} />
            <label htmlFor='load-img'>
                <span className='AdminProductCreator__photo-loader__button'>Выбрать фото</span>
            </label>
        </div>
    );

    const ProductImagePreview = (
        <img ref={productImagePreviewRef} src='' alt='product-preview' />
    )

    return (
        <div className='AdminProductCreator__field'>
            <div className='AdminProductCreator__field__title'>Фото товара:</div>

            {PhotoLoadButton}
            <hr />

            <div className='AdminProductCreator__photos-list'>
                {!!form.photos.length && ProductImagePreview}
            </div>
        </div>
    )
}