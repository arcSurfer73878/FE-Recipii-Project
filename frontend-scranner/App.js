import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';

import Nav from './Nav';


export default class App extends React.Component {

  render() {
    return (
      <Nav />
    );
  }
}


