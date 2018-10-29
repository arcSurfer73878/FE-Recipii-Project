import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import UserPage from '../pages/UserPage';
import NavBar from './Nav';


const AppNavigator = createSwitchNavigator({
  Nav: NavBar,
  User: UserPage,
});

export default AppNavigator;
