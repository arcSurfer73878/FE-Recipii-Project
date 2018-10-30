import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import PostScreen from '../screens/PostScreen';
import RecipeScreen from '../screens/RecipeScreen';
import BasketScreen from '../screens/BasketScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',

};

const PostStack = createStackNavigator({
  Post: PostScreen,
});

PostStack.navigationOptions = {
  tabBarLabel: 'Post',

};

const RecipeStack = createStackNavigator({
  Recipe: RecipeScreen,
});

RecipeStack.navigationOptions = {
  tabBarLabel: 'Recipe',

};
const BasketStack = createStackNavigator({
  Basket: BasketScreen,
});

BasketStack.navigationOptions = {
  tabBarLabel: 'Basket',

};
export default createBottomTabNavigator({
  HomeStack,
  PostStack,
  RecipeStack,
  BasketStack,
});
