import React from "react";
import { Text, View, Button, Image } from "react-native"
import { Header } from 'react-native-elements'
export default class PostPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Post"
  }

  render() {
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: '#ffffff' }}
          leftComponent={{ icon: 'camera-alt', color: 'black', onPress: () => this.props.navigation.navigate('Camera') }}
          centerComponent={{ text: "SCRANNER", style: { color: 'black' } }}
          rightComponent={{ icon: 'face', color: 'black', onPress: () => this.props.navigation.navigate('User') }} />
        <Text>Post</Text>
      </ View>
    )
  }
}