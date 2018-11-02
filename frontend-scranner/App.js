import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import HomeScreen from "./navigation/HomePage"
import PostScreen from './navigation/PostPage'
import RecipeScreen from "./navigation/RecipePage"
import BasketScreen from './navigation/BasketPage'
import UserScreen from "./navigation/UserPage"
import CameraScreen from './navigation/CameraPage'
import Form from './components/Form'
import Logo from './components/Logo'
import SignupSection from './components/SignupSection'
import ButtonSubmit from './components/ButtonSubmit'

export default class App extends React.Component {
  state = {
    login: false
  }
  render() {
    return !this.state.login ?
      (<ImageBackground
        source={
          require('./assets/photo-recipe.png')
        }
        style={styles = { flex: 1, height: '100%', width: '100%' }}
      >
        <Logo />
        <Form />
        <SignupSection />
        <ButtonSubmit login={this.changeView.bind(this)} />
      </ImageBackground>
      ) : (<AppNavigator />)


  }
  changeView() {
    this.setState({
      login: true
    })
  }
}

const BottomNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Recipe: RecipeScreen,
  Basket: BasketScreen
})

const AppNavigator = createSwitchNavigator({
  Bottom: BottomNavigator,
  User: UserScreen,
  Camera: CameraScreen,
  Post: PostScreen,
  App,
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
