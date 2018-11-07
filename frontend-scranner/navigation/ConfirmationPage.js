import React, { Component } from "react";
import { Text, TextInput, View, Button, Image } from "react-native"
import { Header, StyleSheet } from 'react-native-elements'

export default class ConfirmationPage extends Component {
  state = {
    title: '',
    servings: '',
    ingredients: [],
  };


  render() {
    console.log(this.state)
    return (
      <View>
        <Header
          outerContainerStyles={{ backgroundColor: "#ffffff" }}
          leftComponent={{
            icon: "camera-alt",
            color: "black",
            onPress: () => this.props.navigation.navigate("Camera")
          }}
          centerComponent={{ text: "Basket", style: { color: "black" } }}
          rightComponent={{
            icon: "person",
            color: "black",
            onPress: () => this.props.navigation.navigate("User")
          }}
        />
        <View>
          <TextInput value={this.state.title}>
            {/* title */}
          </TextInput>
          <TextInput value={this.state.servings}>
            {/* servings */}
          </TextInput>
          {this.state.ingredients.map((ingredient, index) => {

          <TextInput value={this.state.ingedients}>
            {/* ingredients */}
          </TextInput>
          })}
        </View>
      </View>
    )
  }

  componentDidMount() {
    const ingredients = this.props.navigation.getParam('ingredientList', []);
    this.setState({
      title: ingredients[0],
      servings: this.extractServings(ingredients),
      ingredients: this.getIngredients(ingredients)
    })
  }

  onChangeText = (text, input) => {
    this.setState({
      [input]: text
    });
  }

  getIngredients = (ingredients) => {
    return ingredients.slice(ingredients.indexOf("Ingredients") + 1);
  }

  extractServings = ingredientList => {
    const regex = /(serv)|(yield)|(portion)/i;
    const servingsIndex = ingredientList.findIndex(textLine => {
      return regex.test(textLine);
    });
    const servings = servingsIndex === -1
      ? [0]
      : ingredientList[servingsIndex].match(/\d+/);
    return servings[0];
  };
};