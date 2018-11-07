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
            if (ingredient.body.length > 0) {
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
          <Button title='Add' onPress={this.addIngredient} />
        </View>
      </View>
    )
  }

  componentDidMount() {
    this.setState({
      title: this.props.navigation.getParam('title', ''),
      servings: this.props.navigation.getParam('ingredients', []),
      ingredients: this.props.navigation.getParam('serves', ''),
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
};