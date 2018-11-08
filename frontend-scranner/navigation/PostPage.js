import React, { Component } from 'react';
import { Button, Image, View, ImageBackground } from 'react-native';
import { ImagePicker, Permissions } from 'expo';
import { Header } from 'react-native-elements'
import axios from 'axios'
import Frisbee from "frisbee";
import { GOOGLEVISIONAPI, SPOONACULARAPI } from "../config/index.js";
import { NavigationEvents } from 'react-navigation'
import * as Progress from 'react-native-progress';

export default class PostPage extends Component {
  state = {
    hasGalleryPermission: null,
    isLoading: false,
    image: null,
  };

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur} />
        <View>
          <Header
            outerContainerStyles={{ backgroundColor: "#60256b", height: 75, }}
            leftComponent={{
              icon: "camera-alt",
              size: 30,
              color: "white",
              onPress: () => this.props.navigation.navigate("Camera")
            }}
            centerComponent={{ text: "Upload Recipe", style: { color: "white", fontSize: 18, } }}
            rightComponent={{
              icon: "person",
              size: 30,
              color: "white",
              onPress: () => this.props.navigation.navigate("User")
            }}
          />
        </View>
        <ImageBackground source={require("../assets/offwhite.jpg")}
          style={{
            height: "100%",
            width: "100%"
          }}>
          <View style={{ alignItems: 'center', marginRight: 20, marginLeft: 20, marginBottom: 160, marginTop: 20, borderWidth: 1, borderColor: 'grey' }}>
            <ImageBackground source={require("../assets/white.jpg")} style={{
              height: '100%',
              width: '100%'
            }}>
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
                <Button
                  title='Pick a image from the camera roll'
                  onPress={this.pickImage}
                  color='black'
                  size={18}
                />
                {this.state.isLoading &&
                  <Progress.CircleSnail
                    color={['#E84224']}
                    animated={true}
                    thickness={10}
                    size={250}
                    style={{ position: "absolute", bottom: 200, alignSelf: "center" }}
                  />}
              </View>
              {this.state.image &&
                <Image source={{ uri: this.state.image }} style={{ width: 200, height: 200 }} />}
            </ImageBackground>
          </View>
        </ImageBackground>
      </View>
    );
  }

  componentWillMount() {
    Permissions.askAsync(Permissions.CAMERA_ROLL)
      .then(response => {
        this.setState({ hasGalleryPermission: response === "granted" });
      })
  }

  pickImage = () => {
    ImagePicker.launchImageLibraryAsync({ base64: true })
      .then(result => {
        if (!result.cancelled) {
          this.setState({ isLoading: true })
          this.analyseRecipe(result.base64)
        }
      })
  };

  extractServings = ingredientList => {
    const regex = /(serv)|(yield)|(portion)/i;
    const servingsIndex = ingredientList.findIndex(textLine => {
      return regex.test(textLine);
    });
    const servings = ingredientList[servingsIndex].match(/\d+/);
    return servings[0];
  };

  analyseRecipe = fileName => {
    const visionRequest = {
      requests: [
        {
          image: {
            content: fileName
          },
          features: [
            {
              type: "TEXT_DETECTION"
            }
          ]
        }
      ]
    };
    return axios

      .post(
        `https://vision.googleapis.com/v1/images:annotate?key=${GOOGLEVISIONAPI}`,
        visionRequest
      )
      .then(results => {
        const recipeText =
          results.data.responses[0].textAnnotations[0].description;
        const ingredientList = recipeText.split("\n")
        const serves = this.extractServings(ingredientList);
        const ingredients = ingredientList.slice(
          ingredientList.indexOf("Ingredients") + 1
        );
        this.parseIngredients(ingredients, serves, ingredientList[0]);
      })
      .catch(err => {
        console.error("ERROR:", err);
      });
  };

  parseIngredients = (ingredients, serves, title) => {
    const api = new Frisbee({
      baseURI:
        "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/parseIngredients",
      headers: {
        "X-Mashape-Key": SPOONACULARAPI,
        "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    });
    Promise.all(
      ingredients.map(ingredient => {
        return api.post(`?ingredientList=${ingredient}&servings=${serves}`);
      })
    )
      .then(response => this.addNewRecipe(response, title, serves))
      .catch(err => {
        console.error("ERROR2:", err);
      });
  };

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
          price: 10
        });
      return acc;
    }, []);

    const request = {
      name: title,
      servings,
      ingredients: ingredientList
    };
    api
      .post(
        `https://scranner123.herokuapp.com/api/recipes/${this.props.screenProps.user._id}`,
        { body: request }
      )
      .then(() => {
        this.props.navigation.navigate("Home")
      });
  };
}
