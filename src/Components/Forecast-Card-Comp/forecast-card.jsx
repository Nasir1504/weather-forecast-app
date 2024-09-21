import React from 'react';

//styles
import './forecast-card.scss';

export default function ForecastCard({
    Day,
    HighTemp,
    LowTemp,
    Icon,
    ID,
    Unit,
}) {

    const tempConversion = (Temp) => {
        if (Unit === 'C') {
            // return `${(Temp * 9 / 5) + 32}°F`;
            return `${Math.round((Temp * 9 / 5) + 32)}°F`;

        } else {
            return `${Math.round(Temp)}°C`;
        }
    };

    return (
        <div className="forecast-card-main-container"
            style={{
                display: ID === 0 && 'none'
            }}
        >
            <p>{Day}</p>
            <img src={`https://openweathermap.org/img/wn/${Icon}.png`} alt="weather icon" />

            <p>H: {tempConversion(HighTemp)}</p>
            <p>L: {tempConversion(LowTemp)}</p>
        </div>
    )
}
