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
import { Rating } from 'react-native-elements'

const Form = t.form.Form

const PLECTRUM_IMAGE = require('../assets/images/plectrum.png')

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
    console.log('data', this.state.formData)
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
            <MultiSelect ref={c => this._form = c}/>
          </View>
      )
      case 2:
        let struct = this.state.formData.instruments.reduce((result, instrument)=>{
                    result[instrument] = t.Number
                    return result
                    }, {})
        console.log(struct)
        return(
          <View>
            <Rating
              type='custom'
              ratingImage={PLECTRUM_IMAGE}
              ratingColor='#F53225'
              ratingBackgroundColor='white'
              ratingCount={5}
              imageSize={30}
              onFinishRating={console.log}
              style={{ paddingVertical: 10 }}
            />
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
