import React from 'react';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import HomePage from '../pages/HomePage';
import PostPage from '../pages/PostPage';
import RecipePage from '../pages/RecipePage';
import BasketPage from '../pages/BasketPage';

const HomeStack = createStackNavigator({
  Home: HomePage,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',

};

const PostStack = createStackNavigator({
  Post: PostPage,
});

PostStack.navigationOptions = {
  tabBarLabel: 'Post',

};

const RecipeStack = createStackNavigator({
  Recipe: RecipePage,
});

RecipeStack.navigationOptions = {
  tabBarLabel: 'Recipe',

};
const BasketStack = createStackNavigator({
  Basket: BasketPage,
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
