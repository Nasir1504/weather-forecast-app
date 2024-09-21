import React from 'react';

//styles
import './loading-comp.scss'

//imgs
import LoadingImg from '../../img/cloudy.png';
import LoadingGIF from '../../img/loaging-gif.gif';
import LoadingGIF2 from '../../img/loaging2-gif.gif';



const LoadingComp = () => {
    return (
        <div className="loading-comp-main">

            <img src={LoadingImg} alt="" className="loading-img" />
            <img src={LoadingGIF} alt="" className="loading-gifS" />


        </div>
    )
}


const LoadingGif = () => {
    return(
        <img src={LoadingGIF2} alt="" className="loading-gif" />
    )
}

export { LoadingGif };
export default LoadingComp;