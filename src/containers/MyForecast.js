import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchForecast, setZipCode } from '../actions/forecastActions';

import ForecastButtons from '../components/ForecastButtons';
import ForecastOverview from './ForecastOverview';

class MyForecast extends Component {
  state = {
    cities: this.props.cities,
    extForecasts: []
  };

  componentWillReceiveProps(nextProps) {
    this.setState({
      cities: nextProps.cities
    })
  }

  handleClick = (city, event) => {
    event.preventDefault();
    this.props.fetchForecast(city);
    this.props.setZipCode(city);
    this.setState({ extForecasts: [] })
  }

  render() {
    if (this.state.cities) {
      const citiesArray = this.state.cities.map((city, i) => (
        city.city_attributes.zip_code
      ))

      return (
        <div>
          <ForecastButtons cities={citiesArray} onClick={this.handleClick} />
          <ForecastOverview forecast={this.props.forecast} forecasts={this.state.extForecasts} />
        </div>
      )
    }
    else {
      return (
        <h2>Loading...</h2>
      )
    }
  }
}

export default connect(null, { fetchForecast, setZipCode })(MyForecast);
