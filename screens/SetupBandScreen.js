import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  ScrollView
} from 'react-native';
import { Button, FormLabel } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import t from 'tcomb-form-native'

const BACKEND_IP = require('../.env.js').BACKEND_IP

const Form = t.form.Form

const bandInfoForm = t.struct({
  bandName: t.String,
  bio: t.String,
})

const bandInstrumentForm = t.struct({
  guitar: t.Number,
  bass: t.Number,
  vocals: t.Number,
  drums: t.Number,
  piano: t.Number
})

export default class SetupBandScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
        infoForm: {
          bandName: "",
          bio: "",
        },
        instrumentFormValues: {
          guitar: 0,
          bass: 0,
          vocals: 0,
          drums: 0,
          piano: 0
        }
      }
  }
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

  handleMinus = (field) => {
    let newState = this.state
    if (newState.instrumentFormValues[field] > 0) {
      newState.instrumentFormValues[field] -= 1
    }
    this.setState(newState)
  }

  handlePlus = (field) => {
    let newState = this.state
    newState.instrumentFormValues[field] += 1
    this.setState(newState)
  }

  render() {
    let minusButtons = []
    let plusButtons = []
    let instruments = Object.keys(this.state.instrumentFormValues)
    for (let step =0; step < 5; step ++){
      minusButtons.push(
        <Button
          key={step*10}
          onPress={()=>{this.handleMinus(instruments[step])}}
          icon={
            <Icon
              name="minus"
              size={15}
              color="black"
              />
          }
          buttonStyle={{borderRadius: 10, backgroundColor: '#EFC84A'}}
          containerStyle={{width: 40, height: 40, marginRight: 20, marginTop: 2, marginBottom:  9, marginLeft: 20}}/>
      )
      plusButtons.push(
        <Button
          key={step*100}
          onPress={()=>{this.handlePlus(instruments[step])}}
          icon={
            <Icon
              name="plus"
              size={15}
              color="black"
              />
          }
          buttonStyle={{borderRadius: 10, backgroundColor: '#EFC84A'}}
          containerStyle={{width: 40, height: 40, marginRight: 10, marginTop: 2, marginBottom:  9, marginLeft: 20}}/>
      )
    }
    return (
      <ScrollView>
        <View style={styles.container}>
            <Text style={styles.mainHeading}>
              Lets start your band
            </Text>
            <Image
              source={
                require('../assets/images/band.png')
              }
              style={styles.mainImage}
              />
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Band Info:</Text>
              <Form
                ref={c => this._infoForm = c}
                type={bandInfoForm}
                value={this.state.infoForm}
                onChange={(value)=>{
                  state = this.state
                  state.infoForm = value
                  this.setState(state)
                }}
                options={{auto: 'placeholders'}}/>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.heading}>Members required:</Text>
              <View style={styles.instrumentForm}>
                <View>
                  <Text style={styles.instrumentLabel}>Guitar</Text>
                  <Text style={styles.instrumentLabel}>Bass</Text>
                  <Text style={styles.instrumentLabel}>Vocals</Text>
                  <Text style={styles.instrumentLabel}>Drums</Text>
                  <Text style={styles.instrumentLabel}>Piano</Text>
                </View>
                <View>
                  {minusButtons}
                </View>
                <Form
                  ref={c => this._instrumentForm = c}
                  type={bandInstrumentForm}
                  options={{auto: "none"}}
                  value={this.state.instrumentFormValues}/>
                  <View>
                    {plusButtons}
                  </View>
                </View>
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
      </ScrollView>
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
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: '#ffffff',
    paddingBottom: 0
  },
  instrumentForm: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center'
  },
  instrumentLabel: {
    fontSize: 24,
    marginRight: 20,
    height: 50,
    paddingTop: 5,
    fontFamily: 'Nunito Sans'
  },
  heading: {
    textAlign: 'center',
    fontSize: 25,
    fontFamily: 'Nunito Sans',
    marginBottom: 10
  },
  mainHeading: {
    marginTop: 70,
    fontSize: 40,
    fontFamily: 'Nunito Bold'
  },
  mainImage: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 25,
    marginBottom: 10,
    backgroundColor: '#EFC84A',
    borderRadius: 100
  },
})
