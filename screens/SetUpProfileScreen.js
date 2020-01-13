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
  AsyncStorage,
  ActivityIndicator,
  Button
} from 'react-native';
import MultiSelect from '../components/MultiSelect';
import InstrumentRating from '../components/InstrumentRating';
import FormSummary from '../components/FormSummary';
import ProfileInfo from '../components/ProfileInfo';

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

  handleSubmit = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const userId = await AsyncStorage.getItem('userId')
    let value = this.state.formData
    console.log(value)
    let data = {
      method: 'PATCH',
      body: JSON.stringify(value),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : userToken
      }
    }
    return fetch('http://192.168.48.248:3000/users/'+ userId, data)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('hello',responseJson)
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formType = () => {
    switch (this.state.page){
      case 0:
      return(
        <View>
          <ProfileInfo ref={c => this._form = c._form} />
          <Button title='next' onPress= {this.handleNext}></Button>
        </View>
    )
      case 1:
        return (
          <View><Text style={styles.heading}>What do you play?</Text>
          <View style={styles.multiSelect}>
            <MultiSelect ref={c => this._form = c}/>
            <Button title='next' onPress= {this.handleNext}></Button>
          </View>
          </View>
      )
      case 2:
          return(
            <View>
              <Text style={styles.heading}>How do you rate your playing?</Text>
              <InstrumentRating
                ref = {c => this._form = c}
                instruments={this.state.formData.instruments}
                setInstruments={this.setState}/>
              <Button title='next' onPress= {this.handleNext}></Button>
            </View>
          )
      case 3:
      return(
        <View>
          <Text style={styles.heading}>Does this look right?</Text>
          <FormSummary formData = {this.state.formData}/>
          <Button title='Finish' onPress= {this.handleSubmit}></Button>
        </View>
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
  heading: {
    textAlign: 'center',
    fontSize: 30,
    marginBottom: 30
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
    width: '100%',
    marginTop: 40,
    justifyContent: 'center'
  }
})
