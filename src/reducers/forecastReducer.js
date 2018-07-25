import * as types from '../actions/actionTypes';

export default function forecastReducer(state = {
  zipcode: '',
  icon: '',
  condition: '',
  highTemperature: '',
  lowTemperature: '',
  precipitation: ''
}, action) {
  switch (action.type) {
    case types.GET_ZIPCODE:
      return {
        zipcode: action.payload
      }
    case types.SET_ZIPCODE:
      return {
        zipcode: action.payload
      }
    case types.FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        icon: action.payload.icon_url,
        condition: action.payload.conditions,
        highTemperature: action.payload.high.fahrenheit,
        lowTemperature: action.payload.low.fahrenheit,
        precipitation: action.payload.pop
      }
    default:
      return state;
  }
}
