import React from 'react';
import { createSwitchNavigator } from 'react-navigation';
import BottomNavigator from './BottomNavigator';

export default createSwitchNavigator({
  Bottom: BottomNavigator,
});
