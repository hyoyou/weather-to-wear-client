import * as types from '../actions/actionTypes';

export default function sessionReducer(state = {
  session: !!localStorage.Token,
  user: {}
}, action) {
  switch(action.type) {
    case types.FIND_USER_SUCCESS:
      return {
        ...state,
        session: !!localStorage.Token,
        user: action.payload.user,
        error: ''
      }
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        session: !!localStorage.Token,
        user: action.payload,
        error: ''
      }
    case types.UPDATE_USER_SUCCESS:
      return {
        ...state,
        session: !!localStorage.Token,
        user: action.payload,
        error: ''
      }
    case types.DELETE_USER_CITY_SUCCESS:
      const userCities = state.user.user_cities_attributes.filter(userCity => userCity.id !== parseInt(action.payload, 10))

      return {
        ...state,
        user: { ...state.user,
          user_cities_attributes: userCities
        }
      }
    case types.LOGOUT:
      return {
        session: !!localStorage.Token,
        user: {}
      }
    default:
      return state;
  }
}
