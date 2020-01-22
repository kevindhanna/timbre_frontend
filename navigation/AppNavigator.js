import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import HomeScreen from '../screens/HomeScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SetUpProfileScreen from '../screens/SetUpProfileScreen';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator({ SignUp: SignUpScreen, SetUpProfile: SetUpProfileScreen, Login: LoginScreen });

export default createAppContainer(
  createSwitchNavigator({
      AuthLoading: AuthLoadingScreen,
      App: MainTabNavigator,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    })
);
