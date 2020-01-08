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
import MultiSelect from '../components/MultiSelect';

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
    this.setState({page: ++this.state.page,
    formData: Object.assign(this.state.formData, value)})
  }

  formType = () => {
    switch (this.state.page){
      case 0:
      return(
        <View>
          <Form
          ref = {c => this._form = c}
          type={ProfileForm}/>
        </View>
    )
      case 1:
        return (
          <View style={styles.multiSelect}>
            <MultiSelect/>
          </View>
        )
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
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  multiSelect: {
    height: '50%',
    width: '80%',
    marginTop: 100
  }
})
