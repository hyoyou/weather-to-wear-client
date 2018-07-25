import React from 'react';

const ForecastButtons = ({ cities, onClick }) => {
  return cities.map(city => {
    return (
      <button key={city} className="btn btn-outline-dark btn-margin" style={{ marginRight: '10px' }} type="button" onClick={(event) => onClick(city, event)}>{city}</button>
    )
  })
}

export default ForecastButtons;
