import { UPDATE_LOCATION } from "./types"

export const updateLocation = location => {
  return {
    type: UPDATE_LOCATION,
    payload: location
  }
}
