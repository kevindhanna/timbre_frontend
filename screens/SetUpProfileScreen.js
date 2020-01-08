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
import InstrumentRating from '../components/InstrumentRating';

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
          <Text style={styles.heading}>Lets set up your profile</Text>
          <Form
            ref = {c => this._form = c}
            type={ProfileForm}/>
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
