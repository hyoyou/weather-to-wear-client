import fetch from 'isomorphic-fetch'
import * as types from '../actions/actionTypes';

const APIURL_GEO = `https://api.wunderground.com/api/${process.env.REACT_APP_WUNDERGROUND_API_KEY}/geolookup/q/autoip.json`;
const APIURL_FORECAST = `https://api.wunderground.com/api/${process.env.REACT_APP_WUNDERGROUND_API_KEY}/forecast10day/q`;

const fetchForecastSuccess = (forecast) => {
  return {
    type: types.FETCH_FORECAST_SUCCESS,
    payload: forecast
  }
}

const forecastError = (error) => {
  return {
    type: types.FORECAST_ERROR,
    payload: error
  }
}

export const setZipCode = (zipcode) => {
  return {
    type: types.SET_ZIPCODE,
    payload: zipcode
  }
}

export const fetchLocation = () => {
  return function(dispatch) {
    return fetch(`${APIURL_GEO}`)
    .then(response => response.json())
    .then(result => {
      dispatch(fetchForecast(result.location.zip))
      dispatch({
        type: types.GET_ZIPCODE,
        payload: result.location.zip
      })
    })
  }
}

export const fetchForecast = (zipcode) => {
  return function(dispatch) {
    return fetch(`${APIURL_FORECAST}/${zipcode}.json`)
    .then(response => response.json())
    .then(result => {
      if(result.response.error) {
        dispatch(forecastError(result.response.error))
      } else {
        dispatch(fetchForecastSuccess(result.forecast.simpleforecast.forecastday[0]))
        dispatch({ type: types.CLEAR_ERROR })
      }
    })
  }
}
