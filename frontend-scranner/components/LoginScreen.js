import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import Form from './Form';
import Wallpaper from './Wallpaper';
import ButtonSubmit from './ButtonSubmit';
import SignupSection from './SignupSection';
import { ImageBackground } from "react-native";

export default class LoginScreen extends Component {
  render() {
    return (
      <ImageBackground
        source={
          require('../assets/photo-recipe.png')
        }
        style={styles.welcomeImage}
      >
        <Form />
        <SignupSection />
        <ButtonSubmit />
      </ImageBackground>
    );
  }
}
