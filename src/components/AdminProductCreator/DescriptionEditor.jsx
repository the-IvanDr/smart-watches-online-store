import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeProductInputs } from './../../redux/actions/adminActions';

// import dynamic from 'next/dynamic'
// const JoditEditor = dynamic(() => import('jodit-react'), { ssr: false });


export default function DescriptionEditor() {
    const description = useSelector(state => state.admin.products.createForm.description);
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

    const onBlur = (newContent) => {
        // Some code from stackoverflow
        String.prototype.replaceAll = function (search, replacement) {
            var target = this;
            return target.replace(new RegExp(search, 'g'), replacement);
        };

        // Jodit-react does not closes tags <img> and <br>, and final string is the same content but with closed tags img and br
        let final = newContent.replaceAll('">', '"/>').replaceAll('<br>', '<br/>');
        dispatch(changeProductInputs('description', { ...description, text: final }));
    }

    const loadImagesHandler = (event) => {
        
    }


    const AddImageToDescriptionText = (event) => {
        
    }

    const PhotoListFromDescriptionImages = () => {
        return description.imagesSrc.map((src, index) => {
            return (
                <div key={`descr-image-${index}`} className='AdminProductCreator__photos-list__item'>
                    <button onClick={() => console.log('delete: ', index)}>✖</button>
                    <img onClick={AddImageToDescriptionText} src={src} alt='image' />
                </div>
            )
        })
    }


    const PhotoLoadButton = (
        <div className='AdminProductCreator__photo-loader' style={{ marginTop: '10px' }}>
            <input id='load-img-descr' type='file' accept='.jpg, .jpeg, .png, .webp' multiple onChange={loadImagesHandler} />
            <label htmlFor='load-img-descr'>
                <span className='AdminProductCreator__photo-loader__button'>Загрузить фото</span>
            </label>
        </div>
    );

    return (
        <div className='AdminProductCreator__field'>
            <div className='AdminProductCreator__field__title'>Описание:</div>
            <hr />

            {PhotoLoadButton}

            {
                !!description.imagesSrc.length &&
                <div className="AdminProductCreator__photos-list" style={{ marginBottom: '10px' }}>
                    <p>Кликните на изображение, чтобы прикрепить его к тексту</p>
                    <div className="AdminProductCreator__photos-list__flex-wrapper">
                        <PhotoListFromDescriptionImages />
                    </div>
                </div>
            }


            {/* <JoditEditor
                value={description.text}
                config={JoditConfig}
                tabIndex={1} // tabIndex of textarea
                onBlur={onBlur} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => { }}
            /> */}
        </div >
    );
}