import React from 'react';

//styles
import './error-msg.scss';

export default function ErrorMsg({
    ImgURL
}) {
    return (
        <div className="error-msg-main">
            <img src={ImgURL} alt="" className="error-img" />
            <button className='go-back-btn'
                onClick={() => window.location.reload(false)}
            >Go to Home page</button>
        </div>
    )
}
