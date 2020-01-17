import { UPDATE_FORM_DATA } from "../actions/types"

const initialState = {
  page: 0,
  formData: {}
}

const formDataReducer = (state = initialState, action) => {
  switch(action.type) {
    case UPDATE_FORM_DATA:
      return {
        page: ++state.page,
        formData: Object.assign(state.formData, action.payload)
      }
    default:
      return state
  }
}

export default formDataReducer