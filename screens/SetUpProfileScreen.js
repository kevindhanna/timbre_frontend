import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
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
import { updateFormData } from '../actions/updateFormData'

class SetUpProfileScreen extends Component {
  constructor(props){
    super(props)
  }

  handleNext = () => {
    let value = this._form.getValue()
    console.log(value)
    this.props.update(value)
    console.log(this.props.formData)
  }

  handleSubmit = async () => {
    const userToken = await AsyncStorage.getItem('userToken')
    const userId = await AsyncStorage.getItem('userId')
    let value = this.props.formData
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
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  formType = () => {
    switch (this.props.page){
      case 0:
      return(
        <View>
          <ProfileInfo ref={c => this._form = c} />
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
                instruments={this.props.formData.instruments}
                setInstruments={this.setState}/>
              <Button title='next' onPress= {this.handleNext}></Button>
            </View>
          )
      case 3:
      return(
        <View>
          <Text style={styles.heading}>Does this look right?</Text>
          <FormSummary formData = {this.props.formData}/>
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
  button1: {
    paddingTop: 200
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

const mapStateToProps = state => {
  return {
    page: state.profileForm.page,
    formData: state.profileForm.formData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    update: (newFormData) => {
      dispatch(updateFormData(newFormData))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SetUpProfileScreen)