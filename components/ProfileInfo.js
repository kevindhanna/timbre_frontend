import React, { Component} from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class FormSummary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: null
      errorMessage: null
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({errorMessage:'Permission to access location was denied'});
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({location:location});
  };
}
