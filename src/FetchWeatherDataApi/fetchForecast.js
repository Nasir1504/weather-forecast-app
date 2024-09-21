export const fetchForecast = async (cityName) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await res.json();

        if (data.cod === '200') {
            return data;
        } else {
            // throw new Error(data.message); // Error handling for cases like city not found
            return data.error;

        }
    } catch (e) {
        console.error('Error:', e);
        return { e: e.message }
    };
}