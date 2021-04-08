import React, {useEffect, useState} from 'react';
import clsx from 'clsx';

import Feedback from './../../components/Feedback/index';
import FeedbackCreator from './../../components/FeedbackCreator/index';

export default function FeedbackSection() {
    const [isModalActive, setModalActive] = useState(false);

    useEffect(() => {
        document.body.style.overflowY = isModalActive ? 'hidden' : 'auto';
    }, [isModalActive]);



    return (
        <div className='ProductProfile__feedback-section'>
            <div className='ProductProfile__feedback-section__title'>
                Отзывы
                <span>2</span>
            </div>

            <ul>
                <li><Feedback /></li>
                <li><Feedback /></li>
            </ul>

            <div className={clsx('ProductProfile__feedback-section__modal', isModalActive && 'active')}>
                <div id='new-feedback' className='ProductProfile__feedback-section__title -modal-title'>
                    Новый отзыв
                    <button 
                        className='ProductProfile__feedback-section__adapt-close-btn'
                        onClick={() => setModalActive(false)}
                    >
                        ✖
                    </button>
                </div>

                <div className='ProductProfile__feedback-section__adapt-wrapper'>
                    <FeedbackCreator />
                </div>
            </div>

            <button 
                id='newfeedbackadapt'
                className='ProductProfile__feedback-section__adapt-open-btn'
                onClick={() => setModalActive(true)}
            >
                Написать отзыв
            </button>
        </div>
    )
}