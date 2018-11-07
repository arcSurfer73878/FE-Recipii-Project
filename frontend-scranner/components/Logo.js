import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../assets/logo.png';
import scranner from '../assets/scranner-vector-app.png'
import scrannertext from '../assets/scranner-smalltext.png'

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={scranner} style={styles.image} />
        <Image source={scrannertext} style={styles.text} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
    top: 60
  },
  text: {
    top: 100,
    width: '100%',
    height: '20%',
    padding: 20,
    marginRight: '20%',
    marginLeft: '20%',
  },
});
