import React, { useState } from 'react';

// styles
import './search-city.scss';

export default function SearchCity({
    onCitySelect,
}) {
    const [cityName, setCityName] = useState('');

    const [citySuggest, setCitySuggest] = useState([]);

    const CITY_LIST = [
        'Abu Dhabi',
        'Ahmedabad',
        'Amsterdam',
        'Berlin',
        'Bengaluru',
        'Chicago',
        'Delhi',
        'Helsinki',
        'Istanbul',
        'Jaipur',
        'Indore',
        'Los Angeles',
        'Moscow',
        'Mumbai',
        'New York',
        'Paris',
        'Seoul',
        'Sydney',
        'Tokyo',
        'Vienna',
        'Washingtonian'
    ];

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setCityName(inputValue);

        if (inputValue.length > 0) {
            const filteredCities = CITY_LIST.filter(city =>
                city.toLowerCase().includes(inputValue.toLowerCase())
            );
            setCitySuggest(filteredCities);
        } else {
            setCitySuggest([]); // Clear suggestions if input is empty
        }
    }

    const handleCitySelect = (cityName) => {
        setCityName(cityName)
        setCitySuggest([]);
        onCitySelect(cityName)
    }

    const handleClick = () => {
        onCitySelect(cityName);
        setCitySuggest([]);
    }
    return (
        <div className="search-city-main-cntainer">
            {/* {citySuggest} */}
            <input
                className='input-city'
                type="text"
                value={cityName}
                onChange={handleInputChange}
                placeholder="Search city"
            />
            <button className="search-btn" onClick={() => { handleClick() }}>Search</button>
            {
                citySuggest.length > 0 && (
                    <ul className='city-list'>
                        {citySuggest.map((item, i) => (
                            <li className='cities' key={i} onClick={() => handleCitySelect(item)}>
                                {item}
                            </li>
                        ))}
                    </ul>
                )
            }
        </div >
    )
}
