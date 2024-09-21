import React from 'react';

// styles
import './weather-condition.scss';

export default function WeatherCondition({
    condition,
}) {
    return (
        <div className="weather-condition-main-container">
           <p>{condition}</p>
        </div>
    )
}
