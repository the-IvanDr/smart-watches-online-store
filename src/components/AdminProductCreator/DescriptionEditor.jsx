import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ProductActions } from './../../redux/actions/adminActions';

import { PhotoLoadButton, AdminPannelField, AdminPannelPhotoList, AdminPannelPhotoListItem } from '../AdminPannel';

import dynamic from 'next/dynamic'
const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


export default function DescriptionEditor() {
    const description = useSelector(state => state.admin.products.createForm.description);
    const jwt = useSelector(state => state.auth.authData.token);
    const dispatch = useDispatch();

    const JoditConfig = {
        readonly: false, // all options from https://xdsoft.net/jodit/doc/
        askBeforePasteHTML: false,
        processPasteHTML: false,
        nl2brInPlainText: false,
        addNewLine: false,
        defaultActionOnPaste: 'insert_only_text',
        buttons: [
            'ul',
            'paragraph',
            // 'image',
            'fullsize'
        ],
        buttonsSM: [
            'ul',
            'paragraph',
            // 'image',
            'fullsize'
        ],
        buttonsMD: [
            'ul',
            'paragraph',
            // 'image',
            'fullsize'
        ],
        buttonsXS: [
            'ul',
            'paragraph',
            'image',
            'fullsize'
        ],
        addNewLineTagsTriggers: [
            'br'
        ]
    }

    const setDescription = (newContent) => {
        // Some code from stackoverflow
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        // Jodit-react does not closes tags <img> and <br>, and final string is the same content but with closed tags img and br
        let final = newContent.replaceAll('">', '"/>').replaceAll('<br>', '<br/>');
        dispatch(ProductActions.changeInputs('description', { ...description, text: final }));
    }


    const uploadImagesHandler = (event) => {
        dispatch(ProductActions.uploadDescriptionImages(jwt, event.target.files));
    }

    const removeImageHandler = (src) => {
        dispatch(ProductActions.removeDescriptionImage(jwt, src));
    }

    const AddImageToDescriptionText = (event) => {
        const src = event.target.src;
        const newDescription = description.text + `<img src="${src}" alt="product-description" />`;
        setDescription(newDescription);
    }


    const PhotoListFromDescriptionImages = () => {
        return description.imagesSrc.map((src, index) => (
            < AdminPannelPhotoListItem
                key={`descr-image-${index}`}
                onRemove={() => removeImageHandler(src)
                }
                imgSrc={src}
                onImgClick={AddImageToDescriptionText}
            />
        ));
    }


    return (
        <AdminPannelField title='????????????????'>
            <PhotoLoadButton onChange={uploadImagesHandler} isMultiple={true} inputId={'descr-image-loader'} />

            {
                !!description.imagesSrc.length &&
                <AdminPannelPhotoList>
                    <p>???????????????? ???? ??????????????????????, ?????????? ???????????????????? ?????? ?? ????????????</p>
                    <div className="AdminProductCreator__flex-wrapper">
                        <PhotoListFromDescriptionImages />
                    </div>
                </AdminPannelPhotoList>
            }


            <JoditEditor
                value={description.text}
                config={JoditConfig}
                tabIndex={1} // tabIndex of textarea
                onBlur={setDescription} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            />
        </AdminPannelField>
    );
}