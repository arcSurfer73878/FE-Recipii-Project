import React from 'react';
import { Button, Image, View } from 'react-native';
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
            leftComponent={{ icon: 'keyboard-arrow-left', color: 'black', onPress: () => this.props.navigation.navigate('Recipe') }}
            centerComponent={{ text: 'Add a Recipe', style: { color: 'black' } }}
            rightComponent={{ icon: 'camera-alt', color: 'black', onPress: () => this.props.navigation.navigate('Camera') }} />
        </View>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Button
            title="Pick an image from camera roll"
            onPress={this._pickImage}
          />
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>
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