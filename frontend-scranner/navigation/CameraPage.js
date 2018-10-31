import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from 'expo';
import { Ionicons } from '@expo/vector-icons'
import { Header } from 'react-native-elements'

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

}