import React from 'react'

import Jacket from './Jacket';
import Umbrella from './Umbrella';

const ForecastDetail = (props) => {
  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-md">
          {props.date ? <h2>{props.date}</h2> : <h2>Forecast for {props.zipcode}</h2>}
          <img src={props.icon} width='100' alt="icon for weather condition"/>
          <p>Condition: {props.condition}</p>
          <p>High Temperature: {props.high_temperature}&#8457;</p>
          <p>Low Temperature: {props.low_temperature}&#8457;</p>
          <p>% Precipitation: {props.precipitation}%</p>
        </div>

        <div className="col-md">
          <Jacket temperature={props.low_temperature} />
          <Umbrella precipitation={props.precipitation} />
        </div>
      </div>
    </div>
  )
}

export default ForecastDetail;
