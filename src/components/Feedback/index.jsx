import React from 'react';


export default function Feedback({ username, date, rate, text }) {

    const userNameComponent = (
        <div className='Feedback__header__name'>{username}</div>
    );

    const dateComponent = (
        <div className='Feedback__header__time'>{date}</div>
    );

    const rateComponent = (
        <div className='Feedback__header__rate'>
            <i aria-hidden className={rate >= 1 ? "fas fa-star" : "far fa-star"} />
            <i aria-hidden className={rate >= 2 ? "fas fa-star" : "far fa-star"} />
            <i aria-hidden className={rate >= 3 ? "fas fa-star" : "far fa-star"} />
            <i aria-hidden className={rate >= 4 ? "fas fa-star" : "far fa-star"} />
            <i aria-hidden className={rate >= 5 ? "fas fa-star" : "far fa-star"} />
        </div>
    );

    return (
        <div className='Feedback'>
            <div className='Feedback__flex-wrap'>
                <div className='Feedback__flex-wrap__left'>
                    <div className='Feedback__user-avatar'>
                        <i aria-hidden className="fas fa-user" />
                        {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCe_o8_IQuNtFocDhlA6xVDAZ0CeM0fa2B3g&usqp=CAU' alt='user' /> */}
                    </div>
                </div>

                <div className='Feedback__flex-wrap__right'>

                    <div className='Feedback__adapt'>
                        <div className='Feedback__user-avatar'>
                            <i aria-hidden className="fas fa-user" />
                            {/* <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCe_o8_IQuNtFocDhlA6xVDAZ0CeM0fa2B3g&usqp=CAU' alt='user' /> */}
                        </div>

                        <div className='Feedback__header -sm-width'>
                            {userNameComponent}

                            <div className='Feedback__adapt__flex-wrapper'>
                                {dateComponent}
                                {rateComponent}
                            </div>
                        </div>
                    </div>

                    <div className='Feedback__header -md-width'>
                        {userNameComponent}
                        {dateComponent}
                        {rateComponent}
                    </div>

                    <div className='Feedback__text'>
                        <p>{text}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}