import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import React, { Component, createRef } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  AsyncStorage,
  ActivityIndicator,
  Button
} from 'react-native';
import InstrumentMultiSelect from '../components/InstrumentMultiSelect';
import InstrumentRating from '../components/InstrumentRating';
import FormSummary from '../components/FormSummary';
import ProfileInfo from '../components/ProfileInfo';
const BACKEND_IP = require('../.env').BACKEND_IP


class SetUpProfileScreen extends Component {
  constructor(props){
    super(props)
    this._form = React.createRef()
  }

  formType = () => {
    switch (this.props.page){
      case 0:
        return(
          <ProfileInfo/>
        )
      case 1:
        return (
          <InstrumentMultiSelect />
        )
      case 2:
        return(
          <InstrumentRating/>
        )
      case 3:
        return(
          <FormSummary/> 
        )
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {this.formType()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  button1: {
    paddingTop: 200
  },
  text: {
    fontSize: 100
  },
  formContainer: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff'
  },
})

const mapStateToProps = state => {
  return {
    page: state.profileForm.page
  }
}

export default connect(mapStateToProps, null)(SetUpProfileScreen)