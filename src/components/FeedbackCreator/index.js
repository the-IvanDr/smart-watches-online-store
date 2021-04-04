import React, { useState } from 'react';


export default function FeedbackCreator() {
    // Constants
    const MAX_RATE_VALUE = 5;

    // States
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [rate, setRate] = useState(1);


    // Change rate by click on stars
    const rateChangeHandler = (event) => {
        if(event.target.tagName !== 'I') return;

        const newRate = event.target.dataset.item;
        if(rate !== newRate) setRate(newRate);
    }


    // Get stars according to rate value
    const RateValue = () => {
        const FillStar = ({dataItem}) => <i data-item={dataItem} aria-hidden className="fas fa-star" />;
        const EmptyStar = ({dataItem}) => <i data-item={dataItem} aria-hidden className="far fa-star" />;

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
                        {/* <i aria-hidden className="fas fa-user" /> */}
                        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCe_o8_IQuNtFocDhlA6xVDAZ0CeM0fa2B3g&usqp=CAU' alt='user' />
                    </div>
                </div>

                <div className='FeedbackCreator__flex-wrap__right'>
                    <div className='FeedbackCreator__inputs-wrap'>
                        <input value={name} onChange={(ev) => setName(ev.target.value)} type='text' placeholder='Имя' />
                        <input value={email} onChange={(ev) => setEmail(ev.target.value)} type='email' placeholder='E-mail' />
                        <textarea value={message} onChange={(ev) => setMessage(ev.target.value)} placeholder='Сообщение...' />
                    </div>
                    <div className='FeedbackCreator__rate'>
                        <p>Оцените товар</p>
                        <div className='FeedbackCreator__rate__input' onClick={rateChangeHandler}>
                            <RateValue />
                        </div>
                    </div>

                    <button className='FeedbackCreator__submit-btn'>Отправить</button>
                </div>
            </div>
        </div>
    )
}