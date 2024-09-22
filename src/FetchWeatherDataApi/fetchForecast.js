export const fetchForecast = async (cityName) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  
    // Check if the app is offline
    if (!navigator.onLine) {
      return { error: 'You are offline. Please check your internet connection.' };
    }
  
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
      const data = await res.json();
  
      if (data.cod === '200') {
        return data;
      } else {
        return data.error;
      }
    } catch (e) {
      return { error: e.message };
    }
  };