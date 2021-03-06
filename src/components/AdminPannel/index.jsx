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
            {!!title && <><div className='AdminPannel__field__title'>{title}:</div> <hr /></>}

            {children}
        </div>
    )
}

export const AdminPannelPhotoList = ({ children }) => {
    return (
        <div className='AdminPannel__photos-list'>
            {children}
        </div>
    )
}

export const AdminPannelPhotoListItem = ({ onRemove, imgSrc, onImgClick }) => {
    return (
        <div className='AdminPannel__photos-list__item'>
            <button onClick={onRemove}>✖</button>
            <img src={imgSrc} alt='photo-list-item' onClick={onImgClick} />
        </div>
    )
}

export const AdminInputWrapper = ({ title, type, name, value, onChange, step }) => {
    return (
        <div className='AdminPannel__input-wrapper'>
            {!!title && <span>{title}:</span>}
            <input type={type} step={step} name={name} value={value} onChange={onChange} />
        </div>
    )
}

export const AdminInputRowGroup = ({ children }) => {
    return (
        <div className='AdminPannel__input-row-group'>
            {children}
        </div>
    );
}

export const AdminSelectorWrapper = ({ title, name, selectArrOfObj, onChange }) => {
    return (
        <div className='AdminPannel__input-wrapper'>
            <span>{title}:</span>
            <select name={name} value={selectArrOfObj.find(item => item.active).name} onChange={onChange}>
                {
                    selectArrOfObj.map(item => (
                        <option key={`select-${name}-${item.name}`} value={item.name} >{item.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export const AdminCheckboxListWrapper = ({ children, title }) => {
    return (
        <div className='AdminPannel__input-wrapper'>
            <span>{title}:</span>
            {children}
        </div>
    )
}

export const AdminCheckboxWrapper = ({ name, checked, onChange, title }) => {
    return (
        <div className='AdminPannel__input-wrapper__checkbox'>
            <input type='checkbox' name={name} checked={checked} onChange={onChange} /> {title}
        </div>
    )
}

export const SubmitButton = ({ onClick, title }) => {
    return <button className='AdminPannel__submit-btn' onClick={onClick}>{title}</button>
}

export const ReturnButton = ({ onClick }) => {
    return (
        <button className='AdminPannel__button' onClick={onClick}>
            <i className="fa fa-long-arrow-left" aria-hidden="true" />
            Назад
        </button>
    )
}

export const RedButton = ({ onClick, title }) => {
    return (
        <button className='AdminPannel__red-btn' onClick={onClick}>
            {title}
        </button>
    )
}

export const Button = ({ onClick, title }) => {
    return (
        <button className='AdminPannel__button' onClick={onClick}>
            {title}
        </button>
    )
}

export const AdminPannelViewWrapper = ({ children }) => {
    return (
        <div className='AdminPannel__view'>
            {children}
        </div>
    )
}

export const AdminPannelViewItem = ({ title, value, imgSrc }) => {
    return (
        <div className='AdminPannel__view__item'>
            {title && <div className='AdminPannel__view__item__title'>{title}:</div>}
            {
                imgSrc
                    ? <div className='AdminPannel__view__item__value_img'>
                        <img src={imgSrc} alt='image' />
                    </div>
                    : <div className='AdminPannel__view__item__value'>{value}</div>
            }

        </div>
    )
}