import React from 'react';

import s from './Animation.module.css';

const Animation = () => {
    return(
        <div className={s.parent}>
            <div className={s.load}>
                <hr/><hr/><hr/><hr/>
            </div>
            <div className={s.idea}>RLA Chat: A new way of interaction.</div>
        </div>
    )
};

export default Animation;