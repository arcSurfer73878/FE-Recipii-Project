import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { Header } from 'react-native-elements'
import { GOOGLEVISIONAPI, SPOONACULARAPI } from '../config/index.js'
import axios from 'axios'
import Frisbee from 'frisbee'

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Header
            outerContainerStyles={{ backgroundColor: '#ffffff' }}
            rightComponent={{ icon: 'keyboard-arrow-right', color: 'black', onPress: () => this.props.navigation.navigate('Home') }}
            centerComponent={{ text: "Camera", style: { color: 'black' } }} />
          <Camera ref={ref => { this.camera = ref }} style={{ flex: 1 }} type={this.state.type}>
            <View style={{ position: "absolute", bottom: 35, alignSelf: "center" }}>
              <TouchableOpacity
                onPress={this.takePicture}
                style={{ alignSelf: 'center' }}
              >
                <Ionicons name="ios-radio-button-on" size={70} color="white" />
              </TouchableOpacity>
            </View>
          </Camera>
        </View>
      );
    }
  }

  takePicture = () => {
    if (this.camera) {
      this.camera.takePictureAsync({ base64: true, })
        .then(pictureString => {
          this.analyseRecipe(pictureString.base64)
        })
    }
  }

  analyseRecipe = fileName => {
    const visionRequest = {
      requests: [
        {
          image: {
            content: fileName,
          },
          features: [
            {
              "type": 'TEXT_DETECTION'
            }
          ]
        }]
    }
    return axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLEVISIONAPI}`, visionRequest)
      .then(results => {
        console.log("<<<<<<<<<Response")
        const recipeText = results.data.responses[0].textAnnotations[0].description;
        const ingredientList = recipeText.split("\n")
        const ingredients = ingredientList.slice(ingredientList.indexOf('Ingredients') + 1)
        this.parseIngredients(ingredients)
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }

  parseIngredients = (ingredients) => {
    const api = new Frisbee({
      baseURI: "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/parseIngredients",
      headers: {
        "X-Mashape-Key": SPOONACULARAPI,
        "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    Promise.all(ingredients.map((ingredient) => {
      return api.post(`?ingredientList=${ingredient}&servings=2`)
    })
    )
      .then(response => response.forEach(ingredientDetails => ingredientDetails))
      .catch(err => {
        console.error('ERROR2:', Object.entries(err));
      })
  }

}
