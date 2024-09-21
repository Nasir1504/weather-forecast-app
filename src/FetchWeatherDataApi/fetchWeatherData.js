export const fetchWeatherData = async (cityName) => {
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
// console.log(process.env.REACT_APP_WEATHER_API_KEY)

    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);
        const data = await res.json();
        if (!res.ok) {
            if (res.status === 404) {
                // throw new Error('City not found');
                return data.cod;
            } else {
                throw new Error('Something went wrong, please try again later!')
            }
        }

        return data;
    } catch (e) { return { e: e.message } }
}






// export const fetchWeatherData = async (cityName) => {
//     const apiKey = 'ac139fcc0d0e0035a7c746b1f6a32e0b';

//     try {
//         const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`);

//         if (!res.ok) {
//             if (res.status === 404) {
//                 throw new Error('City not found');
//                 alert('city not found')
//             } else {
//                 throw new Error('Something went wrong, please try again later!')
//             }
//         }

//         return await res.json();
//     } catch (e) { return { e: e.message } }
// }