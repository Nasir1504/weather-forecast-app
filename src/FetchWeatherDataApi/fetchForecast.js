export const fetchForecast = async (cityName) => {
    const apiKey = 'ac139fcc0d0e0035a7c746b1f6a32e0b';
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