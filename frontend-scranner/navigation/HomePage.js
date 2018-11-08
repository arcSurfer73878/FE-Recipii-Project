import React, { Component } from "react";
import {
  Image,
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
          outerContainerStyles={{ backgroundColor: "#ffffff", height: 75, }}
          leftComponent={{
            icon: "camera-alt",
            size: 30,
            color: "black",
            onPress: () => this.props.navigation.navigate("Camera")
          }}
          centerComponent={(<Image resizeMode="cover" style={{ width: 150, height: 25, resizeMode: "contain", alignSelf: "center" }} source={require("../assets/scranner-logo-text-small.png")} />)}
          rightComponent={{
            icon: "person",
            size: 30,
            color: "black",
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
