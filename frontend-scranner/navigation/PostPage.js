import React from 'react';
import { Button, Image, View, ImageBackground } from 'react-native';
import { ImagePicker } from 'expo';
import { Header } from 'react-native-elements'

export default class PostPage extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View>
        <View>
          <Header
            outerContainerStyles={{ backgroundColor: '#ffffff' }}
            rightComponent={{ icon: 'face', color: 'black', onPress: () => this.props.navigation.navigate('User') }}
            centerComponent={{ text: 'Add a Recipe', style: { color: 'black' } }}
            leftComponent={{ icon: 'camera-alt', color: 'black', onPress: () => this.props.navigation.navigate('Camera') }} />
        </View>
        <ImageBackground source={require("../assets/badass-chef.jpg")} style={{
          alignItems: 'center', height: "100%",
          width: "100%"
        }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </ImageBackground>
      </View>
    );
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };
}