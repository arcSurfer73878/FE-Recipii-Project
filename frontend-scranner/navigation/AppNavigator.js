import React from 'react';
import { createStackNavigator } from 'react-navigation';
import NavBar from './Nav';
import HomeScreen from '../screens/HomeScreen'
import UserScreen from '../screens/UserScreen';
import CameraScreen from '../screens/CameraScreen';


const AppNavigator = createStackNavigator({
  Nav: NavBar,
  Home: HomeScreen,
  Camera: CameraScreen,
  User: UserScreen,
});

export default AppNavigator;
