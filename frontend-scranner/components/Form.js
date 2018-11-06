import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import ButtonSubmit from './ButtonSubmit'
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  TextInput
} from 'react-native';

import UserInput from './UserInput';


export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPassword: true,
      press: false,
      username: '',
    };
    this.showPassword = this.showPassword.bind(this);
  }

  showPassword = () => {
    this.state.press === false
      ? this.setState({ showPassword: false, press: true })
      : this.setState({ showPassword: true, press: false });
  }

  render() {
    return (
      <View>
      {/* <KeyboardAvoidingView behavior="padding" style={styles.container}> */}

         <TextInput
          //style={styles.input}
          placeholder={'Username'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          onChangeText={username => this.setState({username})}
          value={this.state.username}
        />
        {/* <UserInput
          secureTextEntry={this.state.showPassword}
          placeholder="Password"
          returnKeyType={'done'}
          autoCapitalize={'none'}
          autoCorrect={false}
        /> */}
      {/* </KeyboardAvoidingView> */}
      <ButtonSubmit onClick={() => this.handleClick(this.state.username)} />
      </View>
    );
  }

  handleClick = (username) => {
    this.props.getUser(username)
  }

}

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  btnEye: {
    position: 'absolute',
    top: 55,
    right: 28,
  },
  iconEye: {
    width: 25,
    height: 25,
    tintColor: 'rgba(0,0,0,0.2)',
  },
});
