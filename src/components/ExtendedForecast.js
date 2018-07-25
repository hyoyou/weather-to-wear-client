import React from 'react';

import ForecastDetail from './ForecastDetail';

const ExtendedForecast = ({ forecasts, zipcode }) => {
  return (
    <div>
      {forecasts && forecasts.map((forecast, index)=>
        <ForecastDetail
          key={index}
          date={forecast.date.weekday}
          zipcode={zipcode}
          icon={forecast.icon_url}
          condition={forecast.conditions}
          high_temperature={forecast.high.fahrenheit}
          low_temperature={forecast.low.fahrenheit}
          precipitation={forecast.pop}
        />
      )}
    </div>
  )
}

export default ExtendedForecast;
