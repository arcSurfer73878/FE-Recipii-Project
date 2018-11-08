import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text, Image } from 'react-native';

import logoImg from '../assets/logo.png';
import scranner from '../assets/scranner-vector-app.png'
import scrannertext from '../assets/scranner-logo-text-small-white.png'

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
  },
  image: {
    width: '50%',
    height: '50%',
    top: 130
  },
  text: {
    top: 180,
    width: 360,
    height: 50,
  },
});
