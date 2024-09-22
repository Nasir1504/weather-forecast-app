import React from 'react';

//styles
import './unit-conversion.scss';

export default function UnitConversion({
    Temp,
    Unit,
    SetUnit
}) {
    // const [unit, setUnit] = useState('C');

    const tempConversion = () => {
        if (Unit === 'C') {
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
                onClick={() => SetUnit(Unit === 'C' ? 'F' : 'C')}
            >
                {Unit === 'C' ? '°C' : '°F'}
            </button>
        </div>
    )
}
