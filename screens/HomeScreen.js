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
import t from 'tcomb-form-native'

const Form = t.form.Form

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
})


export default class HomeScreen extends Component {

  handleSignOut = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth')
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.name}>Home</Text>
        <Button style={styles.SignOut} title='Sign Out' onPress={this.handleSignOut}></Button>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  SignOut: {
    // fontSize: 500
  },
  name: {
    fontSize: 100

  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
