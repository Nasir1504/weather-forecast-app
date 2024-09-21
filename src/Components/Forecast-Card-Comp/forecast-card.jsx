import React from 'react';

//styles
import './forecast-card.scss';

export default function ForecastCard({
    Day,
    HighTemp,
    LowTemp,
    Icon,
    ID,
}) {
    return (
        <div className="forecast-card-main-container"
            style={{
                display: ID === 0 && 'none'
            }}
        >
            <p>{Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Icon}.png`} alt="weather icon" />

            <p>H: {HighTemp}°C</p>
            <p>L: {LowTemp}°C</p>
        </div>
    )
}
