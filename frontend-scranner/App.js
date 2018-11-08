import React, { Component } from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Button, KeyboardAvoidingView } from 'react-native';
import { AppLoading, Asset, Font } from 'expo';
import { createBottomTabNavigator, createSwitchNavigator, createStackNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from "./navigation/HomePage"
import PostScreen from './navigation/PostPage'
import RecipeScreen from "./navigation/RecipePage"
import BasketScreen from './navigation/BasketPage'
import UserScreen from "./navigation/UserPage"
import CameraScreen from './navigation/CameraPage'
import Form from './components/Form'
import Logo from './components/Logo'
import SignupSection from './components/SignupSection';
import ButtonSubmit from './components/ButtonSubmit';
import UserPage from './navigation/UserPage';
import Frisbee from 'frisbee';

export default class App extends Component {
  state = {
    login: false
  }
  constructor(props) {
    super(props)
    state = {
      user: {}
    }
  }
  // #60256b purple
  // #37b348 green

  render() {
    return !this.state.login ?
      (<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ImageBackground
          source={
            require('./assets/scranner-background.jpg')
          }
          style={styles = { flex: 1, height: '100%', width: '100%' }}
        >
          <Logo />
          <Form getUser={this.getUser} />
          <SignupSection />
        </ImageBackground>
      </KeyboardAvoidingView>
      ) : (<AppNavigator
        screenProps={{ user: this.state.user }}
      />)
  }

  getUser = (username) => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      }
    });
    api.get(`https://scranner123.herokuapp.com/api/users/${username}`)
      .then(response => {
        this.setState({
          user: response.body.user,
          login: true,
        });
      })
  }

}

const BottomNavigator = createBottomTabNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      tabBarOptions: {
        showLabel: false
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="home"
          color={tintColor}
          size={30}
        />
      )
    })
  },
  Post: {
    screen: PostScreen,
    navigationOptions: () => ({
      tabBarOptions: {
        showLabel: false
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="add"
          color={tintColor}
          size={40}
        />
      )
    })
  },
  Basket: {
    screen: BasketScreen,
    navigationOptions: () => ({
      tabBarOptions: {
        showLabel: false
      },
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name="shopping-basket"
          color={tintColor}
          size={30}
        />
      )
    })
  },
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
