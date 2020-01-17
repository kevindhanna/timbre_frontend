import React, { Component } from 'react';
import { 
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Button 
} from 'react-native';
import t from 'tcomb-form-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GMAPS_API_KEY, GOOGLE_PLACES } from '../.env.js'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { connect} from 'react-redux'
import { updateFormData } from '../actions/updateFormData'

const Form = t.form.Form

const ProfileForm = t.struct({
  firstName: t.String,
  lastName: t.String,
  bio: t.String,
})

class ProfileInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      errorMessage: null
    }
    this.location = {}
  }
  async UNSAFE_componentWillMount() {
    await this._getLocationAsync()
  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({errorMessage:'Permission to access location was denied'});
    }
    Location.getCurrentPositionAsync({})
    .then((location)=>{
      this.location.coords = [location.coords.latitude, location.coords.longitude]
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GMAPS_API_KEY}`)
      .then((response)=>response.json())
      .then((responseJSON)=> {
        this.location.data = responseJSON
        this.setState({loading: false});
      }).catch((err)=>{console.log(err)})
    })
  };

  handleNext = () => {
    this.props.updateFormData({
      userInfo: this._form.getValue(),
      location: {
        friendlyName: this.location.data.description,
        coords: this.location.coords
      }
    })

  }
  
  render() {
    return this.loading
    ? (
      <ActivityIndicator />
    )
    : (
      <View>
        <Text style={styles.heading}>Lets set up your profile</Text>
            <Form
              ref = {c => this._form = c}
              type={ProfileForm}/>
        <View style={styles.locationContainer}>
            <Text>Location: </Text>
            <GooglePlacesAutocomplete
              minLength={2} // minimum length of text to search
              autoFocus={false}
              returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
              keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
              listViewDisplayed='auto'    // true/false/undefined
              fetchDetails={true}
              renderDescription={row => row.description} // custom description render
              onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                this.location.data = data
              }}
              getDefaultValue={() => {return "here"}}
              query={{
                // available options: https://developers.google.com/places/web-service/autocomplete
                key: GOOGLE_PLACES,
                language: 'en', // language of the results
                types: '(cities)' // default: 'geocode'
              }}
              styles={{
                textInputContainer: {
                  width: '100%'
                },
                description: {
                  fontWeight: 'bold'
                },
                predefinedPlacesDescription: {
                  color: '#1faadb'
                }
              }}
              nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
              GoogleReverseGeocodingQuery={{
                // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
              }}
              GooglePlacesSearchQuery={{
                // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                rankby: 'distance',
                type: 'cafe'
              }}
              GooglePlacesDetailsQuery={{
                // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
                fields: 'formatted_address',
              }}
              filterReverseGeocodingByTypes={['locality', 'administrative_area_level_4']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
              debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
            />
        </View>
        <Button title='next' onPress= {this.handleNext}></Button>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
  locationContainer: {
    height: 300,
    marginBottom: 20,
  }
})

const mapDispatchToProps = dispatch => {
  return {
    updateFormData: (formData) => {
      dispatch(updateFormData(formData))
    }
  }
}

export default connect(null, mapDispatchToProps)(ProfileInfo)
