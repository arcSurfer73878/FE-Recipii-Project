import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { createBottomTabNavigator } from "react-navigation"
import HomePage from "./navigation/HomePage"
import PostPage from "./navigation/PostPage"
import RecipePage from "./navigation/RecipePage"
import BasketPage from "./navigation/BasketPage"



let Nav = createBottomTabNavigator({
  Tab1: { screen: HomePage },
  Tab2: { screen: PostPage },
  Tab3: { screen: RecipePage },
  Tab4: { screen: BasketPage }
})


Nav.navigationOptions = {
  title: "something"
}

export default Nav;