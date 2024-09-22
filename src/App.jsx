import React, { useEffect, useState, Suspense } from 'react';

//styles
import './App.scss';

//fetching data
import { fetchWeatherData } from './FetchWeatherDataApi/fetchWeatherData';
import { fetchForecast } from './FetchWeatherDataApi/fetchForecast';


// imgs
import CloudImg from './img/cloud.png';
import FrameOne from './img/Frame-one.png';
import FrameTwo from './img/Frame-two.png';
import errorImg from './img/error-img.png';
import errorImg2 from './img/error2-img.png';


// components
import LoadingComp from './Components/Loading-Comp/loading-comp';
// import Temperature from './Components/Temperature-Comp/temperature';
// import WeatherCondition from './Components/Weather-Condition-Comp/weather-condition';
import CityName from './Components/City-Name-Comp/city-name';
import SearchCity from './Components/Search-City-Comp/search-city';
import ForecastCard from './Components/Forecast-Card-Comp/forecast-card';
import ErrorMsg from './Components/Error-Msg-Comp/error-msg';
import { LoadingGif } from './Components/Loading-Comp/loading-comp';
const Temperature = React.lazy(() => import('./Components/Temperature-Comp/temperature'));
const WeatherCondition = React.lazy(() => import('./Components/Weather-Condition-Comp/weather-condition'));


function App() {

  // ---------------State---------------------
  const [selectedCity, setSelectedCity] = useState('New York');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [trigger, setTrigger] = useState(false)
  const [unit, setUnit] = useState('C');
  const [error, setError] = useState(null);

  const CACHE_DURATION = 5 * 60 * 1000; //5 seconds

  // -------------------Data Fetching with Cache Logic------------

  useEffect(() => {
    const cachedCity = localStorage.getItem('lastCity');
    const cachedWeatherData = localStorage.getItem('weatherData');
    const cachedForecast = localStorage.getItem('forecastData');
    const cachedTime = localStorage.getItem('cachedTime');
    const currentTime = new Date().getTime();

    // console.log(!navigator.onLine)
    
    // Check if the user is offline
    if (!navigator.onLine) {

      // If offline and cached data is available, use cached data
      if (cachedWeatherData && cachedForecast) {
        setWeatherData(JSON.parse(cachedWeatherData));
        setForecast(JSON.parse(cachedForecast));
      } else {
        // Show error if no cached data available
        setError('You are offline, and no cached data is available.');
      }
      return;
    }

    // Fetch new data if online
    if (
      !cachedCity ||
      selectedCity !== cachedCity || //New city is selected
      currentTime - cachedTime > CACHE_DURATION
    ) {

      fetchWeatherData(selectedCity)
        .then(data => {
          if (data.error) {
            setError(data.error);  // Set error message if fetching failed
          } else {
            setWeatherData(data);
            setError(null);
          }
        })
        .catch(error => setError('Unable to fetch weather data.'));

      // ---------------------------------------------

      fetchForecast(selectedCity)
        .then(data => {
          if (data.error) {
            setError(data.error);  // Set error message if fetching failed
          } else {
            const dailyForecast = data.list.filter(item =>
              new Date(item.dt * 1000).getHours() >= 9 && new Date(item.dt * 1000).getHours() <= 12
            );
            setForecast(dailyForecast);
            setError(null);  // Clear previous errors
          }
        })
        .catch(error => setError('Error fetching forecast data.'));

      // -----------------------------------------------------------------
    } else {
      // Using cached data while city hasn't changed
      setWeatherData(JSON.parse(cachedWeatherData));
      setForecast(JSON.parse(cachedForecast));
      setError(null);
    }

    // eslint-disable-next-line
  }, [selectedCity, CACHE_DURATION]);


  // Caching data on each every update
  useEffect(() => {
    if (weatherData && forecast) {
      localStorage.setItem('lastCity', selectedCity);
      localStorage.setItem('weatherData', JSON.stringify(weatherData));
      localStorage.setItem('forecastData', JSON.stringify(forecast));
      localStorage.setItem('cachedTime', new Date().getTime());
      
    }
    // eslint-disable-next-line
  }, [weatherData, forecast]);

  useEffect(() => {
    setTimeout(() => {
      setTrigger(true)
    }, 500);
    // eslint-disable-next-line
  }, [])

  const handleCitySelect = (selectedCity) => {
    setSelectedCity(selectedCity);
  };
  // console.log(weatherData.weather)

  // --------------------Error Handling------------------
  if (error) {
    return <ErrorMsg ImgURL={errorImg2} />;
  }

  if (!weatherData) {
    return <LoadingComp />;
  }
  else if (weatherData === '404') {
    return <ErrorMsg ImgURL={errorImg} />
  }


  // =======================================================

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

      {/* -------------------Search Bar Comp--------------------- */}

      <SearchCity
        onCitySelect={handleCitySelect}
      />


      <div className="search-result-sec">
        <img className='weather-icon' src={`http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`} alt="weather icon" />

        <div className="content-sec">

          <Suspense fallback={<LoadingGif />}>
            <Temperature
              temp={weatherData?.main.temp}
              Unit={unit}
              SetUnit={setUnit}
            />

          </Suspense>

          <CityName CityName={weatherData?.name} />

          <Suspense fallback={<LoadingGif />}>
            <WeatherCondition
              condition={weatherData?.weather[0].description}
            />
          </Suspense>

        </div>
      </div>


      {/* -------------------Forecast Comp--------------------- */}

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
                Unit={unit}

              />
            )
          })
        }
      </div>
    </div>

  );
}

export default App;