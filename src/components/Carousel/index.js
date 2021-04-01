import React, { useRef, useState, useEffect } from 'react';


export default function Carousel({ children, amountShowedElems = 5 }) {
    // Значение прокрутки слайдера
    const [currentLeftValue, setCurrentLeftValue] = useState(0);

    // Состояния активности кнопок (стрелок)
    const [btnLeft, setBtnLeft] = useState(false);
    const [btnRight, setBtnRight] = useState(true);

    // Кло-во карточек, пролистывающихся слайдером за раз
    const [slideCount] = useState(1);

    // Счетчик кол-ва прокруток
    const [slideCounter, setSlideCounter] = useState(0);

    // Ссылки на элементы слайдера (сам слайдер и кнопки право/лево)
    const sliderRef = useRef();
    const btnLeftRef = useRef();
    const btnRightRef = useRef();


    // Прокрутка слайдера в значение состояния currentLeftValue
    // + проверка состояния кнопок
    useEffect(() => {
        sliderRef.current.style.left = currentLeftValue + 'px';

        // Определение кол-ва карточек (для сравнения со счетчиком слайдов)
        const childrendAmount = sliderRef.current.children.length;

        // Обновление состояния кнопок
        slideCounter > 0
            ? setBtnLeft(true)
            : setBtnLeft(false);

        slideCounter < childrendAmount - amountShowedElems
            ? setBtnRight(true)
            : setBtnRight(false);

    }, [currentLeftValue, slideCounter, amountShowedElems]);



    // toggleClass("disabled") для кнопок слайдера
    useEffect(() => {

        btnLeft
            ? btnLeftRef.current.classList.remove('disabled')
            : btnLeftRef.current.classList.add('disabled');

        btnRight
            ? btnRightRef.current.classList.remove('disabled')
            : btnRightRef.current.classList.add('disabled');

    }, [btnLeft, btnRight]);




    // Обработка нажатия стрелок, изменение состояния currentLeftValue
    const slideHandler = (direction) => {
        // Определение ширины карточки (чтобы пролистывать слайдер по карточкам, а не по пикселям)
        const widthCard = window.getComputedStyle(sliderRef.current.children[0]).width;
        console.log('WIDTH: ', widthCard);

        // Определение кол-ва карточек (для сравнения со счетчиком слайдов)
        const childrendAmount = sliderRef.current.children.length;

        // Определение направления пролистывания (лево - true / право - false)
        if (direction) {
            // Если есть куда листать (смотрим по счетчику прокруток: 0 - начало слайдера)
            if (slideCounter > 0) {
                setCurrentLeftValue(prev => prev + ((parseInt(widthCard) + 30) * slideCount));
                setSlideCounter(prev => prev - slideCount);
            }

        } else {
            // Если есть куда листать (счетчик прокруток меньше чем кол-во карточек в карусели (-5 потому что за раз отображается 5 карточек))
            if (slideCounter < childrendAmount - amountShowedElems) {
                setCurrentLeftValue(prev => prev - ((parseInt(widthCard) + 30) * slideCount));
                setSlideCounter(prev => prev + slideCount);
            }
        }


    }


    return (
        <div className='Carousel'>
            <div className='Carousel__slider' ref={sliderRef}>
                {children}
            </div>

            <button
                className='Carousel__slideRight'
                onClick={() => slideHandler(false)}
                ref={btnRightRef}
            >
                <i aria-hidden className="fas fa-chevron-right" />
            </button>

            <button
                className='Carousel__slideLeft'
                onClick={() => slideHandler(true)}
                ref={btnLeftRef}
            >
                <i aria-hidden className="fas fa-chevron-left" />
            </button>

            <span className='Carousel__crutchRight' />
            <span className='Carousel__crutchLeft' />
        </div>
    )
}