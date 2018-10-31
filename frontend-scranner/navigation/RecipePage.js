import React from "react";
import { Text, View, Button, Image } from "react-native"
import { Header } from 'react-native-elements'
export default class RecipePage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Recipes"
  }
  state = {
    recipes: [
      {
        "_id": "5bd73ddfbf9a0930d7f77b19",
        "name": "Spaghetti bolognese",
        "user": {
          "_id": "5bd73ddfbf9a0930d7f77b15",
          "username": "emmajarvis",
          "firstName": "Emma",
          "lastName": "Jarvis",
          "email": "emmajarvis@gmail.com",
          "__v": 0
        },
        "servings": 2,
        "ingredients": [
          {
            "_id": "5bd73ddfbf9a0930d7f77b1f",
            "name": "Spaghetti",
            "amount": "200",
            "units": "g"
          },
          {
            "_id": "5bd73ddfbf9a0930d7f77b1e",
            "name": "Mushrooms",
            "amount": "80",
            "units": "g"
          },
          {
            "_id": "5bd73ddfbf9a0930d7f77b1d",
            "name": "Beef Mince",
            "amount": "250",
            "units": "g"
          },
          {
            "_id": "5bd73ddfbf9a0930d7f77b1c",
            "name": "Onion",
            "amount": "1",
            "units": "onion"
          },
          {
            "_id": "5bd73ddfbf9a0930d7f77b1b",
            "name": "Chopped Tomatoes"
          },
          {
            "_id": "5bd73ddfbf9a0930d7f77b1a",
            "name": "Garlic paste",
            "amount": "15",
            "units": "g"
          }
        ],
        "__v": 0
      }
    ]
  }
  render() {
    return (
      <View>
        <Header leftComponent={{ icon: 'camera-alt', color: '#fff', onPress: () => this.props.navigation.navigate('Camera') }}
          centerComponent={{ text: "Scranner", style: { color: 'black' } }}
          rightComponent={{ icon: 'face', color: '#fff', onPress: () => this.props.navigation.navigate('User') }} />
        <Text>Recipe:</Text>
        <View>{this.state.recipes.map(recipe => { return (<Text key={recipe._id}>{recipe.name}</Text>) })}</View>
        <Text>Ingredients:</Text>
        <View>{this.state.recipes.map(recipe => { return (recipe.ingredients.map(ingredient => { return (<Text key={ingredient._id}>{ingredient.name}</Text>) })) })}</View>
      </View>
    )
  }
}