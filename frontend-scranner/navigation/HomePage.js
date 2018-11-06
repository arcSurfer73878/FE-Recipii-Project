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
  state = {
    basket: [],
  }
  render() {
    console.log(this.state.basket)
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
          source={require("../assets/photo-recipe.png")}
          style={styles.welcomeImage}
        >
          <ScrollView>
            <RecipeList updateParentState={this.addToBasket} />
          </ScrollView>
          <Text style={{ marginBottom: '15%' }} />
        </ImageBackground>
      </View>
    );
  }

  addToBasket = data => {
    this.setState({
      basket: data
    })
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
