import React, { Component } from "react";
import {
  Alert,
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  ImageBackground,
  View
} from "react-native";
import { Icon } from "react-native-elements";
import Frisbee from "frisbee";

export default class RecipeList extends Component {
  state = {
    recipes: [],
    user: "5be055751d089848b0d05f9b",
  };

  render() {
    const adjective = ['exquisite', 'delicious', 'tasty', 'smooth', 'mellow', 'organic', 'made fresh', 'succulent', 'savory', 'divine', 'refined', 'vibrant', 'sublime', 'delicate']
    return (
      <View style={styles.container}>
        <ImageBackground source={require("../assets/paper-texture.jpeg")}
          style={
            (styles = {
              marginBottom: '2%',
              marginTop: '2%',
              marginLeft: '5%',
              marginRight: '5%',
              alignItems: "center",
              paddingBottom: 20,
              paddingTop: 20,
            })
          }>
          {this.state.recipes.length > 0 &&
            this.state.recipes.map(recipe => {
              const recipeTitle = recipe.name
                .split(" ")
                .map(word => {
                  return word[0].toUpperCase() + word.slice(1);
                })
                .join(" ");
              return (
                <View
                  key={recipe._id}
                  style={{ alignItems: 'center' }}
                >
                  <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                    {recipeTitle}
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 18 }}>
                    Serving for {recipe.servings} {recipe.servings > 1 ? 'Gourmets' : 'Gourmet'}
                  </Text>
                  <Text />
                  <Text style={{ fontSize: 18, fontStyle: 'italic' }}>Les ingrédients du Chef:</Text>
                  <Text />
                  {recipe.ingredients.map(ingredient => {
                    return (
                      <View key={ingredient._id}>
                        <Text style={{ fontFamily: "Courier New", fontSize: 18, fontStyle: "italic" }}>
                          {ingredient.amount} {ingredient.units === ingredient.name.toLowerCase() || ingredient.units === '' ? adjective[Math.floor(Math.random() * Math.floor(13))] : ingredient.units} {ingredient.name}
                        </Text>
                      </View>
                    );
                  })}
                  <Icon
                    name="add"
                    onPress={this.addToBasket}
                  />
                </View>
              );
            })}
        </ImageBackground>

      </View>
    );
  }

  addToBasket = () => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api
      .patch(
        "https://scranner123.herokuapp.com/api/shopping-lists/5be055751d089848b0d05f9b/5be055751d089848b0d05f9f?update=add"
      )
  }

  componentDidMount() {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api
      .get(
        "https://scranner123.herokuapp.com/api/recipes/5be055751d089848b0d05f9b"
      )
      .then(response => {
        this.setState({ recipes: response.body.recipes });
      });
  }

}

const styles = StyleSheet.create({
  container: {
    alignItems: "center"
  }
});
