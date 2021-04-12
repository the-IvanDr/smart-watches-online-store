import React, { useEffect, useState, useRef } from 'react';

export default function GoUp(props) {
    const [isVisible, setIsVisible] = useState(false);
    const buttonRef = useRef();

    const SCROLL_LINE = 700;

    // Обработка скрола (скрыть/показать кнопку)
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler);
        return document.addEventListener('scroll', scrollHandler);
    });

    // Показать/скрыть кнопку в зависимости от состояния isVisible
    useEffect(() => {
        isVisible
            ? buttonRef.current.style.bottom = '-3px'
            : buttonRef.current.style.bottom = '-10%';

    }, [isVisible]);

    // Обработчик события скрола
    const scrollHandler = () => {
        if (window.scrollY >= SCROLL_LINE && !isVisible) {
            setIsVisible(true);
        }

        if (window.scrollY < SCROLL_LINE && isVisible) {
            setIsVisible(false);
        }
    }

    // Скрол вверх
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    return (
        <button className='GoUp' onClick={scrollUp} ref={buttonRef}>
            <i aria-hidden className="fas fa-chevron-up" />
        </button>
    )
}