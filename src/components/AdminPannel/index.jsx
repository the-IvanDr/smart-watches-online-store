import React from 'react';


export const PhotoLoadButton = ({ onChange, isMultiple, inputId }) => {
    return (
        <div className='AdminPannel__photo-loader'>
            <input id={inputId} type='file' accept='.jpg, .jpeg, .png, .webp' multiple={isMultiple} onChange={onChange} />
            <label htmlFor={inputId}>
                <span className='AdminPannel__photo-loader__button'>Загрузить фото</span>
            </label>
        </div>
    );
}

export const AdminPannelField = ({ children, title }) => {
    return (
        <div className='AdminPannel__field'>
            <div className='AdminPannel__field__title'>{title}:</div>
            <hr />
            {children}
        </div>
    )
}