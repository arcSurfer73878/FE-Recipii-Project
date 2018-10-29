import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import UserPage from '../pages/UserPage';
import CameraPage from '../pages/CameraPage';
import NavBar from './Nav';


const AppNavigator = createSwitchNavigator({
  Nav: NavBar,
  User: UserPage,
  Camera: CameraPage,
});

export default AppNavigator;
