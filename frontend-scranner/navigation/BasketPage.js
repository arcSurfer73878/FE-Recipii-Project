import React from "react";
import { Text, View, Button, Image } from "react-native"

export default class BasketPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Basket"
  }

  render() {
    return <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    }>
      <Text>Basket</Text>
    </View>
  }
}