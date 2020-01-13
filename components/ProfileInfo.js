import React, { Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
    let location = await Location.getCurrentPositionAsync({});
    this.setState({location:location});
  };

  render() {
    let location
    if (this.state.location) {
      location = JSON.stringify(this.state.location)
    } else {
      location = this.state.errorMessage
    }
    return (
      <View>
        <Text>location = {location} {GMAPS_API_KEY}</Text>
        <Text style={styles.heading}>Lets set up your profile</Text>
        <Form
          ref = {c => this._form = c}
          type={ProfileForm}/>
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
})
