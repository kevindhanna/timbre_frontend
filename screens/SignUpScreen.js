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
  AsyncStorage,
  Button
} from 'react-native';
import t from 'tcomb-form-native'
import api from '../api'

const BACKEND_IP = require('../.env.js').BACKEND_IP
const Form = t.form.Form

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
})


export default class SignUpScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  handleSignup = () => {
    const value = this._form.getValue()
    this.setState({isLoading: true})
    api.UsersClient.create(value)
    .then(async ({result})=>{
      await AsyncStorage.setItem('userId', result.data.userId)
      this.setState({
        isLoading: false,
      });
      this.props.navigation.navigate('SetUpProfile')
    }).catch(err=>console.log(err))
  }

  loginUser =  async() => {
    await AsyncStorage.setItem('userToken', 'fakeToken')
    this.props.navigation.navigate('SetUpProfile')
  }

  navigateToLogin = () => {
    this.props.navigation.navigate('Login')
  }

  renderSignUpButton = () => {
    return (
      <Button title='Sign Up' onPress={this.handleSignup}/>
    )
  }

  renderLoginButton = () => {
    return (
      <Button title='Login' onPress={this.navigateToLogin}/>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Text style={styles.name}>T I M B R E</Text>
            <Image
              source={
                require('../assets/images/timbre_logo.png')
              }
              style={styles.mainImage}
            />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Sign Up!</Text>
            <Form
              ref = {c => this._form = c}
              type={User}/>
            {this.state.isLoading
              ? <View style={styles.spinnerStyle} ><ActivityIndicator size={'large'}/></View>
              : <View>
                  {this.renderSignUpButton()}
                  {this.renderLoginButton()}
              </View>
            }

            <Button title='Skip' onPress= {this.loginUser}></Button>
          </View>

        </ScrollView>
      </View>
    );
  }
}

SignUpScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  name: {
    fontFamily: 'Work Sans',
    fontSize: 30,
    textAlign: 'center',
    paddingBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formLabel: {
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 20,
    fontFamily: 'Nunito Sans'
  },
  formContainer: {
    justifyContent: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  contentContainer: {
    paddingTop: 30,
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  mainImage: {
    width: 150,
    height: 120,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  }
});
