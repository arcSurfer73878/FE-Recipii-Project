import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Platform,
  ImageBackground,
  ScrollView
} from "react-native";
import RecipeList from "../components/RecipeList.js";
import { Header } from "react-native-elements";
export default class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          outerContainerStyles={{ backgroundColor: "#ffffff" }}
          leftComponent={{
            icon: "camera-alt",
            color: "black",
            onPress: () => this.props.navigation.navigate("Camera")
          }}
          centerComponent={{ text: "SCRANNER", style: { color: "black" } }}
          rightComponent={{
            icon: "face",
            color: "black",
            onPress: () => this.props.navigation.navigate("User")
          }}
        />
        <ImageBackground
          source={require("../assets/white.jpg")}
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
