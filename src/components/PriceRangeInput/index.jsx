import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeField } from '../../redux/actions/filterActions';

export default function PriceRangeInput() {
    // Constances
    const MAX_RANGE_VALUE = 50000;
    const MIN_RANGE_VALUE = 0;

    // Main states: range start/end, full width of the slider line for percentage
    const [startRange, setStartRange] = useState(MIN_RANGE_VALUE);
    const [endRange, setEndRange] = useState(MAX_RANGE_VALUE);
    const [fullWidthLine, setFullWidthLine] = useState(0);

    // States to controll sticks
    const [flag, setFlag] = useState(false); // flag controls was it mouse down, or not
    const [prevX, setPrevX] = useState(null); // previous x-position of the current stick
    const [currentStick, setCurrentStick] = useState(''); // current stick that is moving

    // References on elements
    const startStick_ref = useRef();
    const endStick_ref = useRef();
    const fullLine_ref = useRef();
    const rangeLine_ref = useRef();

    // Reducer
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();


    // Get the width of the line for calculating the percentage
    useEffect(() => {
        const width = parseInt(window.getComputedStyle(fullLine_ref.current).width);
        setFullWidthLine(width);
    }, []);

    // Change sticks' "left" style with the percentage of range from the full line width
    useEffect(() => {

        // Calculating the percentage
        const getPercentage = (value) => {
            const RangeInPercent = (100 * value) / MAX_RANGE_VALUE;
            return (RangeInPercent * fullWidthLine) / 100;
        }

        // Define the stick's width
        const stick_width = parseInt(window.getComputedStyle(startStick_ref.current).width);

        // Set percentage position for the first and the second sticks
        const startStickPosition = getPercentage(startRange);
        const endStickPosition = getPercentage(endRange);

        startStick_ref.current.style.left = startStickPosition - (stick_width / 2) + 'px';
        endStick_ref.current.style.left = endStickPosition - (stick_width / 2) + 'px';

        // Set rangeLine styles (left & width)
        const firstStickRightBorder = startStick_ref.current.getBoundingClientRect().right;
        const secondStickLeftBorder = endStick_ref.current.getBoundingClientRect().left;
        const rangeLineWidth = secondStickLeftBorder > firstStickRightBorder
            ? secondStickLeftBorder - firstStickRightBorder + 3 : 0;

        rangeLine_ref.current.style.width = rangeLineWidth + 'px';
        rangeLine_ref.current.style.left = parseInt(startStick_ref.current.style.left) + (stick_width - 1) + 'px';

    }, [startRange, endRange, fullWidthLine]);


    // Handle inputs
    const rangeOnChangeHandler = (event, stick) => {
        if (stick === 'start') {
            changeSticksZindex(startStick_ref.current, endStick_ref.current);
            if (event.target.value >= endRange) return setStartRange(+endRange - 1);
            else if (event.target.value < MIN_RANGE_VALUE) return setStartRange(MIN_RANGE_VALUE);
            else return setStartRange(event.target.value);
        }

        if (stick === 'end') {
            changeSticksZindex(endStick_ref.current, startStick_ref.current);
            if (event.target.value <= startRange) return setEndRange(+startRange + 1);
            else if (event.target.value >= MAX_RANGE_VALUE) return setEndRange(MAX_RANGE_VALUE);
            else return setEndRange(event.target.value);
        }
    }

    // On Event to controll all events with sticks
    const moveStick = (event) => {
        // event.preventDefault();

        switch (event.type) {
            // MOUSEDOWN
            case 'mousedown': case 'touchstart': setFlag(true); break;

            // MOUSEUP || MOUSELEAVE
            case 'mouseup': case 'touchend': case 'mouseleave':
                setFlag(false);
                setPrevX(null);

                // Set last stick higher z-index
                if (currentStick === 'start')
                    changeSticksZindex(startStick_ref.current, endStick_ref.current);
                else if (currentStick === 'end')
                    changeSticksZindex(endStick_ref.current, startStick_ref.current);

                setCurrentStick('');

                break;

            // MOUSEMOVE
            case 'mousemove': case 'touchmove':
                if (!flag) break;

                const newX = event.changedTouches ? event.changedTouches[0].screenX : event.nativeEvent.screenX;
                console.log('newX: ', newX);
                if (prevX === null) {
                    setPrevX(newX)
                    return;
                }

                // Расчет процентного соотношения между протянутой длинной ползунка, полной ширины слайдера и максимального значения отрезка
                let moveLength = newX - prevX;
                moveLength = (100 * moveLength) / fullWidthLine;
                moveLength = (moveLength * MAX_RANGE_VALUE) / 100;
                moveLength = Math.floor(moveLength);

                // Set the new value to current stick ('start' or 'end')
                if (currentStick === 'start') {
                    setStartRange(prev => {
                        const newValue = +prev + moveLength;
                        if (newValue > MAX_RANGE_VALUE) return MAX_RANGE_VALUE;
                        else if (newValue > endRange) return endRange - 1;
                        else if (newValue < MIN_RANGE_VALUE) return MIN_RANGE_VALUE;
                        else return newValue;
                    });
                }
                else if (currentStick === 'end') {
                    setEndRange(prev => {
                        const newValue = +prev + moveLength;
                        if (newValue > MAX_RANGE_VALUE) return MAX_RANGE_VALUE;
                        else if (newValue < MIN_RANGE_VALUE) return MIN_RANGE_VALUE;
                        else if (newValue < startRange) return startRange + 1;
                        else return newValue;
                    });
                }

                // Finally, set newX to previous x-position
                setPrevX(newX);

                break;

            default:
                return;
        }
    }

    // Which stick is on the front, if one of them was moved above another one.
    const changeSticksZindex = (frontLayerElement, backLayerElement) => {
        frontLayerElement.style.zIndex = 2;
        backLayerElement.style.zIndex = 1;
    }


    return (
        <div className='PriceRangeInput'
            onMouseMove={moveStick}
            onMouseUp={moveStick}
            onMouseLeave={moveStick}

            onTouchMove={moveStick}
        >

            {/* ====================== UP Part of the Slider START ======================== */}
            <div className='PriceRangeInput__wrapp'>
                <input
                    type='number'
                    value={startRange}
                    onChange={(ev) => rangeOnChangeHandler(ev, 'start')}
                />
                <span className='PriceRangeInput__sep-line' />
                <input
                    type='number'
                    value={endRange}
                    onChange={(ev) => rangeOnChangeHandler(ev, 'end')}
                />
                <button onClick={() => dispatch(changeField('price', { min: +startRange, max: +endRange }))}>ОК</button>
            </div>
            {/* ====================== UP Part of the Slider END ======================== */}


            {/* ====================== DOWN Part of the Slider START ======================== */}
            <div className='PriceRangeInput__slider'>
                <div
                    className='PriceRangeInput__slider__full-line'
                    ref={fullLine_ref}
                />
                <div
                    className='PriceRangeInput__slider__range-line'
                    ref={rangeLine_ref}
                />
                <span
                    className='PriceRangeInput__slider__start-pos'
                    ref={startStick_ref}

                    onMouseDown={(ev) => { setCurrentStick('start'); moveStick(ev); }}
                    onMouseUp={(ev) => { setCurrentStick('start'); moveStick(ev); }}

                    onTouchStart={(ev) => { setCurrentStick('start'); moveStick(ev); }}
                    onTouchEnd={(ev) => { setCurrentStick('start'); moveStick(ev); }}

                />
                <span
                    className='PriceRangeInput__slider__end-pos'
                    ref={endStick_ref}

                    onMouseDown={(ev) => { setCurrentStick('end'); moveStick(ev); }}
                    onMouseUp={(ev) => { setCurrentStick('end'); moveStick(ev); }}

                    onTouchStart={(ev) => { setCurrentStick('end'); moveStick(ev); }}
                    onTouchEnd={(ev) => { setCurrentStick('end'); moveStick(ev); }}
                />
            </div>
            {/* ====================== DOWN Part of the Slider END ======================== */}

        </div>
    )
}