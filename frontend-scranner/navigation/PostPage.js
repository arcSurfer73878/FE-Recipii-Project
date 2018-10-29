import React from "react";
import { Text, View, Button, Image } from "react-native"

export default class PostPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Post"
  }

  render() {
    return <View style={
      {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }
    }>
      <Text>Post</Text>
    </ View>
  }
}