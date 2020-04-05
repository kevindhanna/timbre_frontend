import {AsyncStorage} from 'react-native';
import TimbreSDK from 'timbre_sdk'
import {API_URI} from '../.env'

const api = new TimbreSDK(API_URI, {
  storage: AsyncStorage,
  storageId: 'userToken'
})

export default api;