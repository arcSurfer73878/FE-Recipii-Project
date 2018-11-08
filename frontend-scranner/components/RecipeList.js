import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import Frisbee from "frisbee";
import { NavigationEvents } from 'react-navigation'

export default class RecipeList extends Component {
  state = {
    recipes: [],
    isFocused: false
  };
  onDidFocus = () => {
    this.setState({ isFocused: true })
  }

  onDidBlur = () => {
    this.setState({ isFocused: false })
  }
  render() {
    const adjective = ['exquisite', 'delicious', 'tasty', 'smooth', 'mellow', 'organic', 'fresh', 'succulent', 'savory', 'divine', 'refined', 'vibrant', 'sublime', 'delicate']
    return (
      <View style={styles.container}>
        <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur} />
        <View>
          {this.state.recipes.length > 0 ?
            this.state.recipes.map((recipe, index) => {
              const recipeTitle = recipe.name
                .split(" ")
                .map(word => {
                  return word[0].toUpperCase() + word.slice(1);
                })
                .join(" ");
              return (
                <View
                  key={recipe._id}
                  style={{
                    width: 335,
                    alignItems: 'center',
                    marginBottom: '2%',
                    marginTop: 20,
                    marginLeft: '5%',
                    marginRight: '5%',
                    paddingBottom: 0,
                    paddingTop: 20,
                    borderColor: 'grey',
                    borderWidth: 1
                  }}
                ><View style={{ right: 148, top: -13 }}>
                    <Icon name='clear' onPress={() => this.deleteRecipe(index)} />
                  </View >
                  <View style={{ top: -20, alignItems: 'center' }}>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center' }}>
                        {recipeTitle}
                      </Text>
                    </View>
                    <Text />
                    <Text style={{ fontSize: 18 }}>
                      Serving for {recipe.servings} {recipe.servings > 1 ? 'Gourmets' : 'Gourmet'}
                    </Text>
                    <Text />
                    <Text style={{ fontSize: 18, fontStyle: 'italic' }}>Les ingrédients du Chef:</Text>
                    <Text />
                    {recipe.ingredients.map((ingredient) => {
                      return (
                        <View key={ingredient._id}>
                          <Text style={{ fontSize: 18, fontStyle: "italic" }}>
                            {ingredient.amount} {ingredient.units === ingredient.name.toLowerCase() || ingredient.units === '' ? adjective[Math.floor(Math.random() * Math.floor(13))] : ingredient.units} {ingredient.name}
                          </Text>
                        </View>
                      );
                    })}
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
                      <Icon name='remove' onPress={() => this.deleteFromBasket(index)} size={30} />
                      <Text>   </Text>
                      <Icon name='shopping-basket' size={30} />
                      <Text>   </Text>
                      <Icon name='add' onPress={() => this.addToBasket(index)} size={30} />
                    </View>
                  </View>
                </View>
              );
            })
            : <View style={{ alignItems: "center", padding: 10 }}>
              <Text style={{ color: "black", fontSize: 18 }} >Scan A Recipe to start</Text>
            </View>
          }
        </View>

      </View>
    );
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.isFocused !== this.state.isFocused) {
      this.getRecipes()
    }
  }
  addToBasket = (index) => {
    const recipeId = this.state.recipes[index]._id
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.patch(
      `https://scranner123.herokuapp.com/api/shopping-lists/${this.props.user._id}/${recipeId}?update=add`
    )
  }

  deleteFromBasket = (index) => {
    const recipeId = this.state.recipes[index]._id
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.patch(
      `https://scranner123.herokuapp.com/api/shopping-lists/${this.props.user._id}/${recipeId}?update=remove`
    )
  }

  deleteRecipe = (index) => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.del(
      `https://scranner123.herokuapp.com/api/recipes/${this.state.recipes[index]._id}`
    ).then(() => {
      const filteredRecipes = this.state.recipes.filter(recipe => recipe._id !== this.state.recipes[index]._id)
      this.setState({ recipes: filteredRecipes })
    });
  }

  componentDidMount() {
    this.getRecipes()
  }

  getRecipes = () => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.get(
      `https://scranner123.herokuapp.com/api/recipes/${this.props.user._id}`
    ).then(response => {
      this.setState({ recipes: response.body.recipes.reverse() });
    });
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
});
