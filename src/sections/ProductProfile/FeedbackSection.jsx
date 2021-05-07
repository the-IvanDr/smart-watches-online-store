import React, { useEffect, useState } from 'react';
import * as APIQuery from '../../utils/APIQuery';
import clsx from 'clsx';
import { useSelector } from 'react-redux';

import Feedback from './../../components/Feedback/index';
import FeedbackCreator from './../../components/FeedbackCreator/index';

export default function FeedbackSection({ productId }) {
    const [isModalActive, setModalActive] = useState(false);
    const [feedbacks, setFeedbacks] = useState([]);

    const jwt = useSelector(state => state.auth.authData.token);

    useEffect(async () => {
        const response = await APIQuery.Feedbacks.getByProductId(productId);
        setFeedbacks(response.data.feedbacks);

        console.log('feedbackList: ', response.data.feedbacks);

    }, [productId]);

    useEffect(() => {
        document.body.style.overflowY = isModalActive ? 'hidden' : 'auto';
    }, [isModalActive]);

    const createFeedback = async (feedback) => {
        await APIQuery.Feedbacks.create(jwt, { ...feedback, productId });
        const response = await APIQuery.Feedbacks.getByProductId(productId);
        setFeedbacks(response.data.feedbacks);
    }



    return (
        <div className='ProductProfile__feedback-section'>
            <div className='ProductProfile__feedback-section__title'>
                Отзывы
                <span>{feedbacks.length}</span>
            </div>

            <ul>
                {
                    feedbacks.length
                        ? feedbacks.map(feedback => (
                            <li key={feedback.id}>
                                <Feedback
                                    username={feedback.user_name}
                                    date={new Date(feedback.time).toLocaleString()}
                                    rate={feedback.rate}
                                    text={feedback.text}
                                />
                            </li>
                        ))
                        : <p>Здесь еще нет отзывов. Станьте первым</p>
                }
                {/* <li><Feedback /></li>
                <li><Feedback /></li> */}
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
                    {
                        jwt
                            ? <FeedbackCreator productId={productId} createFeedbackHandler={createFeedback} />
                            : <p className='not-auth-message'>Авторизуйтесь, чтобы написать отзыв.</p>
                    }
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