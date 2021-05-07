import React, { useState, useEffect, useRef } from 'react';
import validator from 'validator';
import { useSelector } from 'react-redux';


export default function FeedbackCreator({ createFeedbackHandler }) {
    // Constants
    const MAX_RATE_VALUE = 5;

    // Auth reducer for checking authorization
    const authData = useSelector(state => state.auth.authData);

    // Input validation states
    const [nameValid, setNameValid] = useState(true);
    const [emailValid, setEmailValid] = useState(true);
    const [messageValid, setMessageValid] = useState(true);

    // States
    const [isAuth, setIsAuth] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState(1);


    // Check authorization and disable inputs if 'isAuth'
    useEffect(() => {
        const isAuthorized = !!authData.email && !!authData.fullName && !!authData.fullName.fName && !!authData.fullName.lName;
        setIsAuth(isAuthorized);

        if (isAuthorized) {
            setName(authData.fullName.fName + ' ' + authData.fullName.lName);
            setEmail(authData.email);

        } else {
            setName('');
            setEmail('');
        }

    }, [authData]);

    const submitHandler = async () => {
        const MIN_NAME_LENGTH = 5;
        const MAX_NAME_LENGHT = 30;
        const MIN_MESSAGE_LENGTH = 5;
        let isValid = true;

        if (!validator.isLength(name, { min: MIN_NAME_LENGTH, max: MAX_NAME_LENGHT })) {
            setNameValid(false);
            isValid = false;
        }

        if (!validator.isEmail(email)) {
            setEmailValid(false);
            isValid = false;
        }

        if (!validator.isLength(message, { min: MIN_MESSAGE_LENGTH })) {
            setMessageValid(false);
            isValid = false;
        }

        if (!isValid) return;

        createFeedbackHandler({ name, email, message, rate });
        setMessage('');        
    }

    // Change rate by click on stars
    const rateChangeHandler = (event) => {
        if (event.target.tagName !== 'I') return;

        const newRate = event.target.dataset.item;
        if (rate !== newRate) setRate(newRate);
    }

    // #Component: Get stars according to rate value 
    const RateValue = () => {
        const FillStar = ({ dataItem }) => <i data-item={dataItem} aria-hidden className="fas fa-star" />;
        const EmptyStar = ({ dataItem }) => <i data-item={dataItem} aria-hidden className="far fa-star" />;

        const items = [];
        for (let i = 1; i <= MAX_RATE_VALUE; i++) {
            if (i <= rate) items.push(<FillStar key={i} dataItem={i} />);
            else items.push(<EmptyStar key={i} dataItem={i} />);
        }

        return items;
    }

    return (
        <div className='FeedbackCreator'>
            <div className='FeedbackCreator__flex-wrap'>
                <div className='FeedbackCreator__flex-wrap__left'>
                    <div className='FeedbackCreator__user-avatar'>
                        <i aria-hidden className="fas fa-user" />
                        {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCe_o8_IQuNtFocDhlA6xVDAZ0CeM0fa2B3g&usqp=CAU' alt='user' /> */}
                    </div>
                </div>

                <div className='FeedbackCreator__flex-wrap__right'>
                    <div className='FeedbackCreator__inputs-wrap'>
                        <input
                            value={name}
                            disabled={isAuth}
                            type='text' placeholder='Имя'
                            onChange={(ev) => { setName(ev.target.value); setNameValid(true) }}
                        />
                        <input
                            value={email}
                            disabled={isAuth}
                            type='email' placeholder='E-mail'
                            onChange={(ev) => { setEmail(ev.target.value); setEmailValid(true) }}
                        />
                        <textarea
                            value={message}
                            placeholder='Сообщение...'
                            onChange={(ev) => { setMessage(ev.target.value); setMessageValid(true) }}
                        />
                        {!nameValid && <p className='error-msg'>Не корректное имя</p>}
                        {!emailValid && <p className='error-msg'>Не корректный E-mail</p>}
                        {!messageValid && <p className='error-msg'>Введите текст отзыва</p>}
                    </div>
                    <div className='FeedbackCreator__rate'>
                        <p>Оцените товар</p>
                        <div className='FeedbackCreator__rate__input' onClick={rateChangeHandler}>
                            <RateValue />
                        </div>
                    </div>

                    <button className='FeedbackCreator__submit-btn' onClick={submitHandler}>Отправить</button>
                </div>
            </div>
        </div>
    )
}