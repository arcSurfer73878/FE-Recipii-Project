import React from "react";
import { Text, View, Button, Image } from "react-native"

export default class HomePage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Home"
  }

  render() {
    return <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    }>
      <Text>Home</Text>
    </View>
  }
}