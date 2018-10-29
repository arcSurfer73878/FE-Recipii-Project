import React from "react";
import { Text, View, Button, Image } from "react-native"

export default class BasketPage extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: (
        <Text
          style={{ width: 30, height: 30, backgroundColor: 'orange', justifyContent: "center" }}
        >Logo</Text>
      ),
      headerRight: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="User"
          style={{ backgroundColor: 'orange' }}
          color={'blue'}
        />
      ), headerLeft: (
        <Button
          onPress={navigation.getParam('increaseCount')}
          title="Camera"
          style={{ backgroundColor: 'orange' }}
          color={'blue'}
        />
      )
    }
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