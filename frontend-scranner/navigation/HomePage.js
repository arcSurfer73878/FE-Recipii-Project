import React, { Component } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView
} from "react-native";
import RecipeList from "../components/RecipeList.js";
import { Header } from "react-native-elements";
import { NavigationEvents } from 'react-navigation'

export default class HomePage extends Component {

  state = {
    isFocused: false
  };

  onDidFocus = () => {
    this.setState({ isFocused: true })
  }

  onDidBlur = () => {
    this.setState({ isFocused: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur} />
        <Header
          outerContainerStyles={{ backgroundColor: "#60256b", height: 75, }}
          leftComponent={{
            icon: "camera-alt",
            size: 30,
            color: "white",
            onPress: () => this.props.navigation.navigate("Camera")
          }}
          centerComponent={(<Image resizeMode="cover" style={{ width: 150, height: 25, resizeMode: "contain", alignSelf: "center" }} source={require("../assets/scranner-logo-text-small-white.png")} />)}
          rightComponent={{
            icon: "person",
            size: 30,
            color: "white",
            onPress: () => this.props.navigation.navigate("User")
          }}
        />
        <ImageBackground
          source={require("../assets/photo-recipe.png")}
          style={styles.welcomeImage}
        >
          <ScrollView>
            <RecipeList user={this.props.screenProps.user} />
          </ScrollView>
          <Text style={{ marginBottom: '15%' }} />
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  welcomeImage: {
    height: "100%",
    width: "100%"
  }
});
