import React, { Component } from "react";
import { Text, TextInput, View, Button, Image } from "react-native"
import { Header, StyleSheet } from 'react-native-elements'

export default class ConfirmationPage extends Component {
  state = {
    title: '',
    servings: '',
    ingredients: [],
    newIngredient: {
      name: 'ingredient name',
      amount: 'amount/quantity',
      units: 'units',
    }
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
          <TextInput value={this.state.title} />
          <TextInput value={this.state.servings} />
          {this.state.ingredients.map((ingredient, index) => {
            return (
              <View>
                <TextInput value={this.state.ingredients[index].name} />
                <TextInput value={this.state.ingredients[index].amount} />
                <TextInput value={this.state.ingredients[index].units} />
              </View>
            )
          })}
          <Text>Add Ingredient:</Text>
          <TextInput value={this.state.newIngredient.name} />
          <TextInput value={this.state.newIngredient.amount} />
          <TextInput value={this.state.newIngredient.units} />
          <Button title='Bouton' onPress={this.addIngredient} />
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

  addIngredient = () => {
    const newIngredients = [...this.state.ingredients, this.state.newIngredient]
    this.setState({
      ingredients: newIngredients
    });
  }


};