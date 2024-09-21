import React from 'react';

//components
import UnitConversion from '../Unit-Conversion/unit-conversion';

// styles
import './temperature.scss';

export default function Temperature({ temp }) {
  return (
    <div className="temperature-main-container">
      {/* {temp} */}
      <UnitConversion
        Temp={temp}
      />
    </div>
  )
}
