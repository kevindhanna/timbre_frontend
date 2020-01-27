import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import configureStore from './Store'

import AppNavigator from './navigation/AppNavigator';

function cacheFonts(fonts) {
  return fonts.map(font => Font.loadAsync(font));
}

const Store = configureStore()

export default function App(props) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  if (!isLoadingComplete && !props.skipLoadingScreen) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    return (
      <Provider store={Store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          <AppNavigator />
        </View>
      </Provider>
    );
  }
}

async function loadResourcesAsync() {
  const fonts = [
    {'Work Sans': require('./assets/fonts/WorkSans-Regular.ttf')},
    {'Nunito Sans': require('./assets/fonts/NunitoSans-Regular.ttf')},
    {'Cute Font': require('./assets/fonts/CuteFont-Regular.ttf')},
    {'Nunito Black': require('./assets/fonts/NunitoSans-Black.ttf')},
    {'Nunito Bold': require('./assets/fonts/NunitoSans-Bold.ttf')},
    {...Ionicons.font}
  ]

  const fontAssets = cacheFonts(fonts);
  await Promise.all([...fontAssets]);
}

function handleLoadingError(error) {
  // In this case, you might want to report the error to your error reporting
  // service, for example Sentry
  console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
  setLoadingComplete(true);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
