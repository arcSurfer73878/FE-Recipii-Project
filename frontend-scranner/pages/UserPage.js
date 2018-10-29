import React from "react";
import { Text, View, Button, Image, StyleSheet, Platform } from "react-native"

export default class UserPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={{ width: 30, height: 30, backgroundColor: 'orange', justifyContent: "center" }}
        >Logo</Text>
      ),
      headerRight: (
        <Button
          onPress={() => navigation.navigate('User')}
          title="User"
          style={{ backgroundColor: 'orange' }}
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
        <Text>User</Text>
      </View>
    )
  }
}