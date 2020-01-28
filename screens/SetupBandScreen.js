import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';
import { Button } from 'react-native-elements'
import t from 'tcomb-form-native'

const BACKEND_IP = require('../.env').BACKEND_IP

const Form = t.form.Form

const bandInfoForm = t.struct({
  bandName: t.String,
  bio: t.String,
})

const bandInstrumentFrom = t.struct({
  guitar: t.Number,
  bass: t.Number,
  vocals: t.Number,
  drums: t.Number,
  piano: t.Number
})
const instrumentFormValues = {
  guitar: 0,
  bass: 0,
  vocals: 0,
  drums: 0,
  piano: 0
}

export default class SetupBandScreen extends Component {
  handleSubmit = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const info = this._infoForm.getValue()
    let value = {
      bandName: info.bandName,
      bio: info.bio,
      missingInstruments: this._instrumentForm.getValue()
    }
    let data = {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : userToken
      }
    }
    return fetch('http://' + BACKEND_IP + ':3000/bands/', data)
      .then((response) => response.json())
      .then((responseJson) => {
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Form
            ref={c => this._infoForm = c}
            type={bandInfoForm}
            options={{auto: 'placeholders'}}/>
          <Text style={styles.heading}>Members required</Text>
          <Form
            ref={c => this._instrumentForm = c}
            type={bandInstrumentFrom}
            value={instrumentFormValues}/>
        </View>
        <Button 
          onPress={this.handleSubmit}
          raised
          type='outline'
          title='submit'
          titleStyle={{fontFamily: 'Nunito Bold'}}
          buttonStyle={{padding: 10, borderRadius: 10, borderWidth: 1.2}}
          containerStyle={{width: 200, marginBottom: 20}}/>
      </View>
    )
  }
}

SetupBandScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  formContainer: {
    width: "80%",
    marginTop: 30,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 10,
    marginTop: 10
  },
})