import React, { Component} from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import t from 'tcomb-form-native'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { GMAPS_API_KEY } from '../.env.js'

const Form = t.form.Form

const ProfileForm = t.struct({
  firstName: t.String,
  lastName: t.String,
  bio: t.String,
})

export default class FormSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null,
      errorMessage: null
    }
  }

  async componentWillMount() {
    await this._getLocationAsync()
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({errorMessage:'Permission to access location was denied'});
    }
    Location.getCurrentPositionAsync({})
    .then((location)=>{
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GMAPS_API_KEY}`)
      .then((response)=>response.json())
      .then((responseJSON)=> {
        this.setState({location: responseJSON});
      }).catch((err)=>{console.log(err)})
    })
  };

  render() {
    return this.state.location 
    ? (
      <View>
          <Text>location = {this.state.location.results[2].address_components[2].long_name}</Text>
          <Text style={styles.heading}>Lets set up your profile</Text>
          <Form
            ref = {c => this._form = c}
            type={ProfileForm}/>
      </View>
    )
    : (<ActivityIndicator />)
  }
}

const styles = StyleSheet.create({
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
  },
})
