import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ImageBackground
} from "react-native";
import { Header } from 'react-native-elements'
export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header leftComponent={{ icon: 'camera-alt', color: '#fff', onPress: () => this.props.navigation.navigate('Camera') }}
          centerComponent={{ text: "SCRANNER", style: { color: 'black' } }}
          rightComponent={{ icon: 'face', color: '#fff', onPress: () => this.props.navigation.navigate('User') }} />
        <ImageBackground
          source={
            require('../assets/photo-recipe.png')
          }
          style={styles.welcomeImage}
        >
          <Text>HomePage</Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  welcomeImage: {
    height: '100%',
    width: '100%'
  }
});
