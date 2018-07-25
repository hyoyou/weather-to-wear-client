import React, { Component } from 'react';

import ForecastDetail from '../components/ForecastDetail';
import ExtendedForecast from '../components/ExtendedForecast';

const APIURL_FORECAST = `https://api.wunderground.com/api/${process.env.REACT_APP_WUNDERGROUND_API_KEY}/forecast10day/q`;

class ForecastOverview extends Component {
  state = { extForecasts: this.props.forecasts };

  componentWillReceiveProps(nextProps) {
    this.setState({ extForecasts: nextProps.forecasts })
  }

  handleClick = (event) => {
    event.preventDefault();

    return fetch(`${APIURL_FORECAST}/${this.props.forecast.zipcode}.json`)
    .then(response => response.json())
    .then(result => {
      let resultsArray = [];

      result.forecast.simpleforecast.forecastday.slice(1, 5).map(weather =>
        resultsArray.push(weather)
      )

      this.setState({ extForecasts: resultsArray })
    })
}

  render() {
    const { forecast } = this.props;

    return (
      <div>
        <ForecastDetail
          zipcode={forecast.zipcode}
          icon={forecast.icon}
          condition={forecast.condition}
          high_temperature={forecast.highTemperature}
          low_temperature={forecast.lowTemperature}
          precipitation={forecast.precipitation}
        />
        <button className="btn btn-outline-dark" onClick={(event) => this.handleClick(event)}>Get Extended Forecast</button>
        <ExtendedForecast
          zipcode={forecast.zipcode}
          forecasts={this.state.extForecasts}
        />
      </div>
    )
  }
}

export default ForecastOverview;
