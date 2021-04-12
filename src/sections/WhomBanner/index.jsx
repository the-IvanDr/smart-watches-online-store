import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';

export default function WhomBanner(props) {
    const [slideWidth, setSlideWidth] = useState(null);
    const [activeSlide, setActiveSlide] = useState(true);

    const slider_ref = useRef();
    const slider_anchor_ref = useRef();
    const btn1_ref = useRef();
    const btn2_ref = useRef();

    const CHANGE_INTERVAL = 4000;


    useEffect(() => {
        setSlideWidth(slider_anchor_ref.current.clientWidth)
        setInterval(() => setActiveSlide(prev => !prev), CHANGE_INTERVAL);
    }, []);

    // Прокрутка слайдера на активный слайд
    useEffect(() => {
        activeSlide
            ? slider_ref.current.style.left = 0 + 'px'
            : slider_ref.current.style.left = -slideWidth + 'px';

    }, [activeSlide, slideWidth]);


    /*************************************************
      Обработка свайпов по слайдеру со смартфона
    *************************************************/

    let prevX = null;
    let direction = null; // true - свайп в лево, false - свайп в право

    // Обработка начала свайпа (сохранение переменной prevX)
    function handleTouchStart(event) {
        slider_ref.current.style.transition = 'none'; // отключение свойства transition на время свайпа
        prevX = event.touches[0].clientX;
    };

    // Обработка движения "пальца/стилуса/локтя/носа" по слайду
    const handleTouchMove = (event) => {
        if (!prevX) return;

        const currentX = event.touches[0].clientX; // определение текущей позиции указателя на экране по оси Х
        const length = currentX - prevX; // вычисление длины свайпа (прокрутки)

        direction = length < 0; // определение направления свайпа
        moveSlider(length);     // сдвинуть слайдер на определенную длину
        prevX = currentX;       // текущее значение позиции становится предыдущим
    }

    // прокрутка слайдера
    const moveSlider = (length) => {
        const prev = parseInt(window.getComputedStyle(slider_ref.current).left); // определение текущей позиции слайдера по свойству left

        // Проверка можно ли прокручивать слайдер
        if (direction) {
            if (prev <= -slideWidth) return;
        } else {
            if (prev >= 0) return;
        }

        // прокрутка слайдера, посредством изменения  свойства left (предыдущее значение + текущее)
        slider_ref.current.style.left = prev + length + 'px';
    }

    // Обработка удаления "пальца/стилуса/локтя/носа" от экрана
    const handleTouchEnd = (event) => {
        slider_ref.current.style.transition = '.5s all'; // вернуть свойство transition для плавности анимации

        // по результатам свайпа - поменять состояние активного слайда activeSlide
        if (direction) setActiveSlide(false); // активировать правый слайд
        else setActiveSlide(true);           // активировать правый слайд
    }


    return (
        <section className='WhomBanner'>
            <div className='WhomBanner__carousel' onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
                <div className='WhomBanner__slider' ref={slider_ref}>
                    <a href='/' ref={slider_anchor_ref}>
                        <img src='./assets/images/whom-banner/for-him.jpg' alt='Watches for Man' />
                    </a>
                    <a href='/'>
                        <img src='./assets/images/whom-banner/for-her.jpg' alt='Watches for Women' />
                    </a>
                </div>
            </div>

            <div className='WhomBanner__btn-wrapper'>
                <button className={clsx(activeSlide && 'active')} ref={btn1_ref} onClick={() => setActiveSlide(true)} />
                <button className={clsx(!activeSlide && 'active')} ref={btn2_ref} onClick={() => setActiveSlide(false)} />
            </div>

        </section>
    )
}