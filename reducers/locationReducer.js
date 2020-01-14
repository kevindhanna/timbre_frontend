import { UPDATE_LOCATION } from "../actions/types"

const initialState = {
  location: {}
}

const locationReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_LOCATION:
      return {
        ...state,
        location: {
          locationData: action.locationData,
        }
      }
    default:
      return state
  }
}

export default locationReducer
