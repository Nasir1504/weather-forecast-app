import React from 'react';

//styles
import './loading-comp.scss'

//imgs
import LoadingImg from '../../img/cloudy.png';

export default function LoadingComp() {
    return (
        <div className="loading-comp-main">

            <img src={LoadingImg} alt="" className="loading-img" />

        </div>
    )
}
