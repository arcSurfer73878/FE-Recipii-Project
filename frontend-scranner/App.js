import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Button } from 'react-native';
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
import SignupSection from './components/SignupSection'
import ButtonSubmit from './components/ButtonSubmit'
import UserPage from './navigation/UserPage';

export default class App extends React.Component {
  state = {
    login: false
  }
  constructor(props) {
    super(props)
    state = {
      user: {
        _id: "5bd73ddfbf9a0930d7f77b15",
        username: "emmajarvis",
        firstName: "Emma",
        lastName: "Jarvis",
        email: "emmajarvis@gmail.com",
        profilePicture: "",
        address: {
          houseNumber: "",
          street: "",
          city: "",
          postcode: "",
          telephone: "",
        },
        __v: 0
      }
    }
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
  User: {
    screen: props => <UserScreen {...props} user={this.state.user} />
  },
  Camera: CameraScreen,
  Post: PostScreen,
  App,
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
