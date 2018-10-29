import React from "react";
import { Text, View, Button, Image } from "react-native"

export default class RecipePage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Recipes"
  }

  render() {
    return <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    }>
      <Text>Recipe</Text>
    </View>
  }
}