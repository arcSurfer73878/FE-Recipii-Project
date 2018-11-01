import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { Header } from 'react-native-elements'
import { GOOGLEVISIONAPI, SPOONACULARAPI } from '../config/index.js'
import axios from 'axios'

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
        // const ingredientList = recipeText.split("\n")
        // const ingredients = ingredientList.slice(ingredientList.indexOf('Ingredients') + 1)
        this.parseIngredients()
      })
      .catch(err => {
        console.error('ERROR:', err);
      });
  }

  parseIngredients = (ingredient) => {
    const URL = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/parseIngredients"
    console.log(SPOONACULARAPI)
    axios({
      method: 'POST',
      url: `${URL}?ingredientList=coffee&servings=2`,
      headers: {
        "X-Mashape-Key": SPOONACULARAPI,
        "X-Mashape-Host": "spoonacular-recipe-food-nutrition-v1.p.mashape.com",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": 'axios/0.18.0'
      }
    })
      .then(result => {
        console.log("<<<<<<<<<SPOONACULAR")
        console.log(result);
      })
      .catch(err => {
        console.error('ERROR2:', Object.entries(err));
      })
  }

}
