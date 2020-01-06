import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Button
} from 'react-native';
import t from 'tcomb-form-native'

const Form = t.form.Form

const ProfileForm = t.struct({
  firstName: t.String,
  lastName: t.String,
  bio: t.String,
})


export default class SetUpProfileScreen extends Component {

  constructor(props){
    super(props)
    this.state = {
      page: 0,
      formData: {}
    }
  }

  handleNext = () => {
    let value = this._form.getValue()
    console.log('value', value)
    this.setState({page: ++this.state.page,
    formData: Object.assign(this.state.formData, value)})
    console.log(this.state.formData)
  }

  formType = () => {

    switch (this.state.page){
      case 0:
      return(
        <Form
        ref = {c => this._form = c}
        type={ProfileForm}/>
    )
      case 1:
        return InstrumentForm
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          {this.formType()}
        <Button title='next' onPress= {this.handleNext}></Button>
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
  text: {
    fontSize: 100
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff'
  }
})
