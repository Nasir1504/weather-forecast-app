import React from 'react';

//styles
import './loading-comp.scss'

//imgs
import LoadingImg from '../../img/cloudy.png';
import LoadingGIF from '../../img/loaging-gif.gif';


export default function LoadingComp() {
    return (
        <div className="loading-comp-main">

            <img src={LoadingImg} alt="" className="loading-img" />
            <img src={LoadingGIF} alt="" className="loading-gifS" />


        </div>
    )
}
