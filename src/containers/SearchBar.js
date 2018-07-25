import React, { Component } from 'react';

import ForecastDetail from '../components/ForecastDetail';

const APIURL_FORECAST = `https://api.wunderground.com/api/${process.env.REACT_APP_WUNDERGROUND_API_KEY}/forecast10day/q`;

class SearchBar extends Component {
  state = {
    zipcode: '',
    forecast: '',
    error: ''
  };

  onInputZipCode = event => {
    this.setState({
      zipcode: event.target.value
    });
  }

  onSearch(event) {
    event.preventDefault();

    const { zipcode } = this.state;

    return fetch(`${APIURL_FORECAST}/${zipcode}.json`)
    .then(response => response.json())
    .then(result => {
      if(result.response.error) {
        this.setState({ error: result.response.error.description })
      } else {
        this.setState({
          ...this.state,
          forecast: result.forecast.simpleforecast.forecastday[0]
        })
      }
    })
  }

  render() {
    const { zipcode, forecast, error } = this.state;

    if (error) {
      return (
        <div style={{ marginTop: '50px' }}>
          <p>{error}</p>
          <p>Please check the zip code and try your search again</p>
        </div>
      )
    }

    return (
      <div style={{ marginTop: '50px' }}>
        <h3>Show me the weather in...</h3>

        <form onSubmit={event => this.onSearch(event)}>
          <div className="form-row justify-content-center py-4">
            <label htmlFor="search"><span role="img" aria-label="left pointing magnifying glass">&#x1F50D;</span></label>
            <div className="col-auto">
              <input
                type="text"
                id="search"
                className="form-control"
                value={zipcode}
                placeholder="Zip Code"
                onChange={this.onInputZipCode} />
            </div>
            <button className="btn btn-outline-dark" type="submit">Search</button>
          </div>
        </form>

        { forecast &&
          <ForecastDetail
            zipcode={zipcode}
            icon={forecast.icon_url}
            condition={forecast.conditions}
            high_temperature={forecast.high.fahrenheit}
            low_temperature={forecast.low.fahrenheit}
            precipitation={forecast.pop}
          />
        }
      </div>
    )
  };
}

export default SearchBar;
