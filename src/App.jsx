import React, { useEffect, useState } from 'react';

//styles
import './App.scss';

// components
import LoadingComp from './Components/Loading-Comp/loading-comp';
import Temperature from './Components/Temperature-Comp/temperature';
import WeatherCondition from './Components/Weather-Condition-Comp/weather-condition';
import CityName from './Components/City-Name-Comp/city-name';
import SearchCity from './Components/Search-City-Comp/search-city';
import ForecastCard from './Components/Forecast-Card-Comp/forecast-card';
import ErrorMsg from './Components/Error-Msg-Comp/error-msg';

//fetching data
import { fetchWeatherData } from './FetchWeatherDataApi/fetchWeatherData';
import { fetchForecast } from './FetchWeatherDataApi/fetchForecast';


// imgs
import CloudImg from './img/cloud.png';
import FrameOne from './img/Frame-one.png';
import FrameTwo from './img/Frame-two.png';


function App() {

  // ---------------State---------------------
  const [selectedCity, setSelectedCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [trigger, setTrigger] = useState(false)

  // -------------------Data Fetching------------
  useEffect(() => {
    fetchWeatherData(selectedCity)
      .then(data => { setWeatherData(data); })
      .catch(error => console.error('Data Cannot fetch:', error));


    fetchForecast(selectedCity)
      .then(data => {
        const dailyForecast = data.list.filter(item =>
          new Date(item.dt * 1000).getHours() >= 9 && new Date(item.dt * 1000).getHours() <= 12
        );
        setForecast(dailyForecast);
      })
      .catch(error => console.error('Error fetching forecast data:', error));

  }, [selectedCity]);

  useEffect(() => {
    setTimeout(() => {
      setTrigger(true)
    }, 500);
  }, [])

  const handleCitySelect = (selectedCity) => {
    setSelectedCity(selectedCity);
  };
  // console.log(weatherData)

  // --------------------Error Handling------------------
  if (!weatherData) {
    return <LoadingComp />;
  }
  else if (weatherData === '404') {
    return <ErrorMsg />
  }


  return (

    <div className="App-main">

      <img src={FrameOne} alt="" className="bg-frame-one" />
      <img src={FrameTwo} alt="" className="bg-frame-two" />
      <img
        className="cloud-one"
        src={CloudImg}
        alt=""
        style={{
          transform: trigger && 'translate(0)'
        }}
      />
      <img
        className="cloud-two"
        src={CloudImg}
        alt=""
        style={{
          transform: trigger && 'translate(0)'
        }}
      />
      <h1
        style={{
          transform: trigger && 'translate(0)'
        }}
      >Weather Companion</h1>

      <SearchCity
        onCitySelect={handleCitySelect}
      />
      <div className="search-result-sec">
        <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt="weather icon" />

        <div className="content-sec">
          <Temperature
            temp={weatherData?.main.temp}
          />
          <CityName
            CityName={weatherData?.name}
          />
          <WeatherCondition
            condition={weatherData?.weather[0].description}
          />
        </div>
      </div>
      <div className='forecast-section'>
        {
          forecast?.map((day, i) => {
            return (
              <ForecastCard
                key={i}
                Day={new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}
                // Day={new Date(day.dt * 1000).toLocaleDateString('en-US', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                ID={i}
                HighTemp={day.main.temp_max}
                LowTemp={day.main.temp_min}
                Icon={day.weather[0].icon}

              />
            )
          })
        }
      </div>
    </div>

  );
}

export default App;