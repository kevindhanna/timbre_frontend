import { createStore, combineReducers } from 'redux';
import formDataReducer from './reducers/formDataReducer'
import locationReducer from './reducers/locationReducer'

const rootReducer = combineReducers({
  profileForm: formDataReducer,
  location: locationReducer
})

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;
