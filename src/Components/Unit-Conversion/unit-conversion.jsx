import React, { useState } from 'react';

//styles
import './unit-conversion.scss';

export default function UnitConversion({
    Temp
}) {
    const [unit, setUnit] = useState('C');

    const tempConversion = () => {
        if (unit === 'C') {
            // return `${(Temp * 9 / 5) + 32}°F`;
            return `${Math.round((Temp * 9 / 5) + 32)}°F`;

        } else {
            return `${Math.round(Temp)}°C`;
        }
    };

    return (
        <div className="unit-conversion-main">
            <p>{tempConversion()}</p>
            <button
                className='conversion-btn'
                onClick={() => setUnit(unit === 'C' ? 'F' : 'C')}
            >
                {unit === 'C' ? '°F' : '°C'}
            </button>
        </div>
    )
}
