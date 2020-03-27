import * as WebBrowser from 'expo-web-browser';
import React, {
  Component
} from 'react';
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

const BACKEND_IP = require('../.env').BACKEND_IP
const Form = t.form.Form

const User = t.struct({
  email: t.String,
  password: t.String,
})


export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    }
  }

  navigateToSignup = () => {
    this.props.navigation.navigate('SignUp')
  }

  handleLogin = () => {
    const value = this._form.getValue()
    let data = {
      method: 'POST',
      body: JSON.stringify({
        email: value.email,
        password: value.password,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }
    this.setState({
      isLoading: true
    })
    return fetch("http://" + BACKEND_IP + ":3000/users/login", data)
      .then((response) => response.json())
      .then(async (responseJson) => {
        await AsyncStorage.setItem('userToken', responseJson.user.token)
        await AsyncStorage.setItem('userId', responseJson.user.userId)
        this.setState({
          isLoading: false,
        });
        this.props.navigation.navigate('Home')
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderLoginButton = () => {
    if (this.state.isLoading) {
      return (
        <View style = { styles.spinnerStyle}>
        <ActivityIndicator size = {'large'}/>
        </View>
      )
    }
    return (
      <Button title = 'Login' onPress = {this.handleLogin}/>
    )
  }

  renderSignUpButton = () => {
    if (this.state.isLoading) {
      return (
        <View style = { styles.spinnerStyle }>
        < ActivityIndicator size = { 'large'}/>
        </View >
      )
    }
    return (
      <Button title = 'Sign Up' onPress = {this.navigateToSignup}/>
    )
  }

  render() {
    return (
      <View style = { styles.container}>
        <ScrollView style = {styles.container} contentContainerStyle = { styles.contentContainer }>
        <View style = {styles.iconContainer}>
        <Text style = {styles.name} > T I M B R E </Text>
        <Image source = {require('../assets/images/timbre_logo.png')} style = {styles.mainImage}/>
      </View>

      <View style = {styles.formContainer}>
        <Text style = {styles.formLabel}>Login!</Text>
        <Form ref = {c => this._form = c} type = {User}/>
        {this.renderLoginButton()}
        {this.renderSignUpButton()}
      </View>
      </ScrollView>
    </View >
    );
  }
}

LoginScreen.navigationOptions = {
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
        shadowOffset: {
          width: 0,
          height: -3
        },
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
