import React, { Component } from "react";
import { Text, TextInput, View, Button, Image } from "react-native"
import { Header, StyleSheet } from 'react-native-elements'

export default class ConfirmationPage extends Component {
  state = {
    title: '',
    servings: '',
    ingredients: [],
    newName: 'ingredient name',
    newAmount: 'amount/quantity',
    newAnits: 'units',
  };


  render() {
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
          <TextInput value={this.state.title} onChangeText={(text) => this.updateText(text, title)} />
          <TextInput value={this.state.servings} onChangeText={(text) => this.updateText(text, servings)} />
          {this.state.ingredients.reduce((acc, ingredient, index) => {
            if (ingredient.length > 0) {
              acc.push(
                <View key={index}>
                  <TextInput value={ingredient[0].name} />
                  <TextInput value={ingredient[0].amount.toString()} />
                  <TextInput value={ingredient[0].unit} />
                </View>
              )
            }
            return acc
          }, [])}
          <Text>Add Ingredient:</Text>
          <TextInput value={this.state.newName} onChangeText={(text) => this.updateText(text, 'newName')} />
          <TextInput value={this.state.newAmount} onChangeText={(text) => this.updateText(text, 'newAmount')} />
          <TextInput value={this.state.newUnits} onChangeText={(text) => this.updateText(text, 'newUnits')} />
          <Button title='Add Ingredient' onPress={this.addIngredient} />
        </View>
        <Button title='Confirm Recipe' onPress={this.addNewRecipe} />
      </View>
    )
  }

  componentDidMount() {
    this.setState({
      title: this.props.navigation.getParam('title', ''),
      ingredients: this.props.navigation.getParam('ingredients', []),
      serves: this.props.navigation.getParam('serves', ''),
    })
  }

  updateText = (text, input) => {
    this.setState({
      [input]: text
    });
  }

  addIngredient = () => {
    const newIngredient = [{ name: this.state.newName, amount: this.state.newAmount }]
    const newIngredients = [...this.state.ingredients, newIngredient]
    console.log(newIngredients)
    this.setState({
      ingredients: newIngredients
    });
  }

  addNewRecipe = (ingredients, title, servings) => {
    const api = new Frisbee({
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    });

    const ingredientList = ingredients.reduce((acc, ingredient) => {
      if (ingredient.body.length > 0)
        acc.push({
          foodType: ingredient.body[0].aisle,
          name: ingredient.body[0].name,
          amount: ingredient.body[0].amount,
          units: ingredient.body[0].unit,
          price: ingredient.body[0].estimatedCost.value
        });
      return acc;
    }, []);

    const request = {
      name: title,
      servings,
      ingredients: ingredientList
    };

    console.log(request, "<<<<<<<<<<<<<<<<");
    api
      .post(
        `https://scranner123.herokuapp.com/api/recipes/5be2fdbc6333b741ca036886`,
        { body: request }
      )
      .then(response => {
        console.log(response)
        this.props.navigation.navigate("Home")
      });
  };
}
