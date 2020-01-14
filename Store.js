import { createStore, combineReducers } from 'redux';
import formDataReducer from './reducers/formDataReducer'

const rootReducer = combineReducers({
  profileForm: formDataReducer
})

const configureStore = () => {
  return createStore(rootReducer);
}

export default configureStore;