import React from "react";
import { Text, View, Button, Image, StyleSheet, Platform } from "react-native"

export default class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerLeft: (
        <Button
          onPress={() => navigation.navigate('Camera')}
          title="Camera"
          color={'blue'}
        />
      ),
      headerTitle: (
        <Text
          style={{ width: 30, height: 30, backgroundColor: 'orange', justifyContent: "center" }}
        >Logo</Text>
      ),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('User')}
          title="User"
          color={'blue'}
        />
      )
    }
  }

  render() {
    return (
      <View style={
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center"
        }
      }>
        <Text>Home</Text>
      </View>
    )
  }
}