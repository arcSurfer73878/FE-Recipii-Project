import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  View,
} from 'react-native';
import Frisbee from 'frisbee';

export default class RecipeList extends Component {

  state = {
    recipes: [],
    user: '5bdc70fed1830c1a584407ac'
  }

  componentDidMount() {
    const api = new Frisbee({
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    api.get('https://scranner123.herokuapp.com/api/recipes/5bdc70fed1830c1a584407ac')
      .then(response => {
        this.setState({ recipes: response.body.recipes })
      })

  }

  render() {
    return (<View>
      (this.state.recipes.length > 0 &&
        {this.state.recipes.map(recipe => {
        return (
          <View key={recipe._id}>
            <Text>{recipe.name}</Text>
            <Text>Servings: {recipe.servings}</Text>
            {console.log(recipe.ingredients)}
            {recipe.ingredients.map(ingredient => {
              return <View key={ingredient._id}>
                <Text>{ingredient.amount}{ingredient.unit} {ingredient.name}</Text>
              </View>
            })}
          </View>
        )
      })}
      )
    </View>)
  };

}