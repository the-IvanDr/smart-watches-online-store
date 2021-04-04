import React from 'react';


export default function Feedback() {
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
                    <div className='Feedback__header'>
                        <div className='Feedback__header__name'>Dryga Ivan</div>
                        <div className='Feedback__header__time'>24.01.2021</div>
                        <div className='Feedback__header__rate'>
                            <i aria-hidden className="fas fa-star" />
                            <i aria-hidden className="fas fa-star" />
                            <i aria-hidden className="fas fa-star" />
                            <i aria-hidden className="far fa-star" />
                            <i aria-hidden className="far fa-star" />
                        </div>
                    </div>

                    <div className='Feedback__text'>
                        <p>On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. </p>
                    </div>
                </div>
            </div>
        </div>
    )
}