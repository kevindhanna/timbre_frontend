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
  Button
} from 'react-native';
import t from 'tcomb-form-native'

import { MonoText } from '../components/StyledText';

const Form = t.form.Form

const User = t.struct({
  email: t.String,
  username: t.String,
  password: t.String,
})

export default class HomeScreen extends Component {
  handleSubmit = () => {
    const value = this._form.getValue()
    console.log("value", value)
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}>
          <View style={styles.iconContainer}>
            <Image
              source={
                require('../assets/images/guitar.png')
              }
              style={styles.mainImage}
            />
          </View>
  
          <View style={styles.formContainer}>
            <Text style={styles.formLabel}>Sign Up!</Text>
            <Form 
              ref = {c => this._form = c}
              type={User}/>
            <Button title='Sign Up' onPress={this.handleSubmit}/>
          </View>
          
        </ScrollView>
        <View style={styles.tabBarInfoContainer}>
          <View
            style={[styles.codeHighlightContainer, styles.navigationFilename]}>
            <MonoText style={styles.codeHighlightText}>
              navigation/MainTabNavigator.js
            </MonoText>
          </View>
        </View>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  formLabel: {
    textAlign: 'center',
    fontSize: 30,
    paddingBottom: 20
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
