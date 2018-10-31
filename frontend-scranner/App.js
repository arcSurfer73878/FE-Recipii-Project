import React from 'react';
import { Platform, StatusBar, StyleSheet, View, ImageBackground, Button } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation'
import UserScreen from "./navigation/UserPage"
import CameraScreen from './navigation/CameraPage'
import HomeScreen from "./navigation/HomePage"
import PostScreen from './navigation/PostPage'
import RecipeScreen from "./navigation/RecipePage"
import BasketScreen from './navigation/BasketPage'
import Form from './components/Form'
import Logo from './components/Logo'
import SignupSection from './components/SignupSection'
import ButtonSubmit from './components/ButtonSubmit'
// import { Actions, ActionConst } from 'react-native-router-flux';
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
    {/* <ButtonSubmit /> */}
    <Button title="Login" onPress={this.handleChange} />
   </ImageBackground>
   ) : (<RouterNavigator />)


 }
 handleChange = () => {
  this.setState({
   login: true
  })
 }
}

const BottomNavigator = createBottomTabNavigator({
 Home: HomeScreen,
 Post: PostScreen,
 Recipe: RecipeScreen,
 Basket: BasketScreen
})

const RouterNavigator = createSwitchNavigator({
 Bottom: BottomNavigator,
 User: UserScreen,
 Camera: CameraScreen,
})



