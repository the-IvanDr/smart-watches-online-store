import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TypeActions } from '../../redux/actions/adminActions';

import { AdminInputWrapper, AdminPannelField, ReturnButton, SubmitButton } from '../AdminPannel';


export default function AdminTypesCreator() {
    const jwt = useSelector(state => state.auth.authData.token);
    const form = useSelector(state => state.admin.types.createForm);
    const dispatch = useDispatch();

    const submitHandler = () => {
        dispatch(TypeActions.create(jwt, form));
    }

    const nameChangeHandler = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        dispatch(TypeActions.changeInputs(fieldName, fieldValue));
    }

    return (
        <div className='AdminTypesCreator'>
            <AdminPannelField>
                <ReturnButton onClick={() => dispatch(TypeActions.openList())} />
            </AdminPannelField>
            <AdminPannelField title='Название типа'>
                <AdminInputWrapper type='text' name='name' value={form.name} onChange={nameChangeHandler} />
            </AdminPannelField>
            <AdminPannelField>
                <SubmitButton title='Отправить' onClick={submitHandler} />
            </AdminPannelField>
        </div>
    )
}