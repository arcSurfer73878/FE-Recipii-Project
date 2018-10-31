import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { Header } from 'react-native-elements'
import { analyseRecipe } from './utils/index.js'

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
          <Header rightComponent={{ icon: 'keyboard-arrow-right', color: '#fff', onPress: () => this.props.navigation.navigate('Home') }}
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
          console.log(pictureString)
          analyseRecipe(pictureString)
        })
    }
  }



}