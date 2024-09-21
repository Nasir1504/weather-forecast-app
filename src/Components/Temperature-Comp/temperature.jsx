import React from 'react';

//components
import UnitConversion from '../Unit-Conversion/unit-conversion';

// styles
import './temperature.scss';

export default function Temperature({
  temp,
  Unit,
  SetUnit
}) {
  return (
    <div className="temperature-main-container">
      <UnitConversion
        Temp={temp}
        Unit={Unit}
        SetUnit={SetUnit}
      />
    </div>
  )
}
