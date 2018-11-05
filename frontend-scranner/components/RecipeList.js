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
    return (<View style={styles.container}>
      ({this.state.recipes.length > 0 &&
        this.state.recipes.map(recipe => {
          console.log(recipe)
          const recipeTitle = recipe.name.split(' ').map(word => { return word[0].toUpperCase() + word.slice(1) }).join(' ')
          return (
            <View key={recipe._id} style={styles = {
              backgroundColor: '#f1f1f1',
              margin: 2, alignItems: 'center',
              padding: 20, width: '80%'
            }}>
              <Text style={{ fontFamily: 'Georgia', fontSize: 20 }}>{recipeTitle}</Text>
              <Text> </Text>
              <Text style={{ fontFamily: 'Georgia', fontSize: 18 }}>Servings: {recipe.servings}</Text>
              {/* {console.log(recipe.ingredients)} */}
              {
                recipe.ingredients.map(ingredient => {
                  return <View key={ingredient._id}>
                    <Text style={{ fontFamily: 'Georgia', fontSize: 18 }}>{ingredient.amount}{ingredient.unit} {ingredient.name}</Text>
                  </View>
                })
              }
              <Text></Text>
            </View>
          )
        })}
      )
    </View>)
  };

}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});