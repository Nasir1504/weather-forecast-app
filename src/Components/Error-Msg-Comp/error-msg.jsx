import React from 'react';

//styles
import './error-msg.scss';

//imgs
import errorImg from '../../img/error-img.png';
export default function ErrorMsg() {
    return (
        <div className="error-msg-main">
            <img src={errorImg} alt="" className="error-img" />
            <button className='go-back-btn'
                onClick={() => window.location.reload(false)}
            >Go to Home page</button>
        </div>
    )
}
