import React from 'react';

export default function SubmitButton(){

    const submitHandler = () => {
        console.log('SUBMIT');

    }

    return (
        <div className='AdminProductCreator__field'>
            <button className='AdminProductCreator__submit-btn' onClick={submitHandler}>Отправить</button>
        </div>
    )
}