import React, { Component } from 'react';
import { ImageBackground, KeyboardAvoidingView, View } from 'react-native';
import { createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import { Icon } from 'react-native-elements'
import HomeScreen from "./navigation/HomePage"
import PostScreen from './navigation/PostPage'
import BasketScreen from './navigation/BasketPage'
import UserScreen from "./navigation/UserPage"
import CameraScreen from './navigation/CameraPage'
import Form from './components/Form'
import Logo from './components/Logo'
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
  render() {
    return !this.state.login ?
      (<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ImageBackground
          source={
            require('./assets/scranner-background.jpg')
          }
          style={styles = { flex: 1, height: '100%', width: '100%' }}
        >
          <View style={{ flex: 1, marginBottom: 170 }}>
            <Logo />
            <Form getUser={this.getUser} />
          </View>
        </ImageBackground>
      </KeyboardAvoidingView>
      ) : (<AppNavigator
        screenProps={{ user: this.state.user, onLogout: () => this.handleLogout() }}
      />)
  }

  handleLogout = () => {
    this.setState({
      login: false
    })
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
        showLabel: false,
        activeTintColor: '#60256b'
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
        showLabel: false,
        activeTintColor: '#60256b'
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
        showLabel: false,
        activeTintColor: '#60256b'
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
})

