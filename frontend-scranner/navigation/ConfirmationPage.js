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
          {this.state.ingredients.reduce((acc, ingredient) => {
            if (ingredient.length > 0) {
              acc.push(
                <View>
                  <TextInput value={ingredient.name} />
                  <TextInput value={ingredient.amount} />
                  <TextInput value={ingredient.units} />
                </View>
              )
            }
            return acc
          }, [])}
          <Text>Add Ingredient:</Text>
          <TextInput value={this.state.newIngredient.name} onChangeText={(text) => this.updateText(text, { newIngredient: name })} />
          <TextInput value={this.state.newIngredient.amount} onChangeText={(text) => this.updateText(text, { newIngredient: amount })} />
          <TextInput value={this.state.newIngredient.units} onChangeText={(text) => this.updateText(text, { newIngredient: units })} />
          <Button title='Add Ingredient' onPress={this.addIngredient} />
        </View>
        <Button title='Confirm Recipe' onPress={this.addRecipe} />
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
    const newIngredients = [...this.state.ingredients, this.state.newIngredient]
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

};