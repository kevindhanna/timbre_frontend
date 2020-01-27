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
} from 'react-native';
import { Button } from 'react-native-elements'
import t from 'tcomb-form-native'

export default function HomeScreen(props) {

  const navigateToSetupBand = () => {
    props.navigation.navigate('SetUpBand')
  }

  const navigateToBands =  () => {

  }

  const handleSignOut = async () => {
    const keys = await AsyncStorage.getAllKeys();
    const result = await AsyncStorage.multiGet(keys)
    if (keys.length > 0) {
      await AsyncStorage.clear()
      props.navigation.navigate('Auth')
    }

  }

    return (
      <View style={styles.container}>
        <Text style={styles.name}>Thanks, for joining!</Text>
        <Image
          source={
            require('../assets/images/Rock.png')
          }
          style={styles.mainImage}
        />
      <RenderButton
        title='Wanna start a Band?'
        onPress={navigateToSetupBand} />
      <RenderButton title='Wanna Join a Band?' onPress= {navigateToBands}/>
      <RenderButton title='Sign Out' onPress= {handleSignOut}/>
      </View>
    );
};

const RenderButton = ({ title, onPress}) => (
  <Button
    onPress={onPress}
    raised
    type='outline'
    title={title}
    titleStyle={{fontFamily: 'Nunito Bold'}}
    buttonStyle={{padding: 10, borderRadius: 10, borderWidth: 1.2}}
    containerStyle={{width: 200, marginBottom: 20}}/>
)


HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  SignOut: {
    // fontSize: 500
  },
  name: {
    fontFamily: 'Nunito Bold',
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 50,
  },
  container: {
    flex: 1,
    marginTop: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 40,
    backgroundColor: '#EFC84A',
    borderRadius: 155
  },
});
