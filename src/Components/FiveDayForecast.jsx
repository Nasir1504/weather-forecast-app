import React, { useState, useEffect } from 'react';
import { fetchForecast } from '../FetchWeatherDataApi/fetchForecast';

export default function FiveDayForecast({ selectedCity }) {
    const [forecastData, setForecastData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getForecastData = async () => {
            const data = await fetchForecast(selectedCity);
            if (data.error) {
                setError(data.error);
            } else {
                setForecastData(data);
            }
        };

        if (selectedCity) {
            getForecastData();
        }
    }, [selectedCity]);

    return (
        <div>
            {error && <p>Error: {error}</p>}
            {forecastData && (
                <div className="forecast">
                    {forecastData.list.map((forecast, index) => (
                        <div key={index}>
                            <p>{new Date(forecast.dt_txt).toLocaleDateString()}</p>
                            <p>Temp: {forecast.main.temp}°C</p>
                            <p>Condition: {forecast.weather[0].description}</p>
                            <img
                                src={`http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}
                                alt={forecast.weather[0].description}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}