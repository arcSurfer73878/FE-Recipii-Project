import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet
} from "react-native";
import { Header } from 'react-native-elements'
class UserPage extends Component {
  state = {
    user: {
      _id: "5bd73ddfbf9a0930d7f77b15",
      username: "emmajarvis",
      firstName: "Emma",
      lastName: "Jarvis",
      email: "emmajarvis@gmail.com",
      __v: 0
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Header 
        outerContainerStyles={{ backgroundColor: '#ffffff' }}
        leftComponent={{ icon: 'keyboard-arrow-left', color: 'black', onPress: () => this.props.navigation.navigate('Home') }}
          centerComponent={{ text: "User", style: { color: 'black' } }} />
        <Text>You are logged as {this.state.user.username}</Text>
      </View>
    );
  }
}
export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});