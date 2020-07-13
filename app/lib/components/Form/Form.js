import React, {useState} from 'react';
import { v1 as uuid } from 'uuid';

import s from './Form.module.css';

const Form = (props) => {    
    const [hostName, setHostName] = useState('');
    const [clientName, setClientName] = useState('');
    const [hostCourse, setHostCourse] = useState('');
    const [clientRoll, setClientRoll] = useState('');
    const [classSecret, setClassSecret] = useState('');
    const [classKey, setClassKey] = useState('');


    const create = () => {
        const id = uuid();
        props.history.push({
            pathname: `/room/${id}`,
            state: {
                isHost: true,
                unique: classSecret,
                name: hostName
            }
        });
    };

    const join = () => {
        const id = uuid();
        props.history.push({
            pathname: `/room/${classKey}`,
            state: {
                isHost: false,
                unique: clientRoll,
                name: clientName
            }
        });
    };

    const renderForm = (heading, hint='Course', onSubmit, onFirstChange, onSecondChange, onThirdChange, first, second, third) => {
        return (
            <>
                <span className={s.main_id}>{heading} Class</span>
                <form onSubmit={onSubmit} className={s.main_create}>
                    <input value={first} onChange={onFirstChange} className={s.main_create_child} type='text' required placeholder='Full Name' />
                    <input value={second} onChange={onSecondChange} className={s.main_create_child} type='text' required placeholder={hint} />
                    <input value={third} onChange={onThirdChange} className={s.main_create_child} type='text' required placeholder={hint==='Course'?'Host Secret (used to uniquely identify the host)':'Class Code'} />
                    <input type='submit' value={heading} className={s.main_create_child} />
                </form>
            </>
        )
    }

    return(
        <div className={s.main}>
            {renderForm(
             'Create',
             undefined, 
             create, 
             ({target}) => setHostName(target.value),
             ({target}) => setHostCourse(target.value),
             ({target}) => setClassSecret(target.value),
             hostName, hostCourse, classSecret
            )}
            {renderForm(
             'Join',
             'College Roll No.',
             join,
             ({target}) => setClientName(target.value),
             ({target}) => setClientRoll(target.value),
             ({target}) => setClassKey(target.value),
             clientName, clientRoll, classKey
            )}
        </div>
    )
};

export default Form;