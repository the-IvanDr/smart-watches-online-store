import React from 'react';

export default function SubmitButton(){

    const submitHandler = () => {
        console.log('SUBMIT');

    }

    return (
        <div className='AdminPannel__field'>
            <button className='AdminPannel__submit-btn' onClick={submitHandler}>Отправить</button>
        </div>
    )
}