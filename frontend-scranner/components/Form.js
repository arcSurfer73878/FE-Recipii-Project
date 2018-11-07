import React, { Component } from 'react';
import ButtonSubmit from './ButtonSubmit'
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';

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
      <View >
        <View style={styles.container}><TextInput
          placeholder={'Username'}
          autoCapitalize={'none'}
          returnKeyType={'done'}
          placeholderTextColor="black"
          underlineColorAndroid="transparent"
          onChangeText={username => this.setState({ username })}
          value={this.state.username}
        /></View>
        <View>
          <ButtonSubmit onClick={() => this.handleClick(this.state.username)} />
        </View>
      </View>
    );
  }

  handleClick = (username) => {
    this.props.getUser(username)
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    top: -105,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginRight: '5%',
    marginLeft: '5%',
    borderRadius: 20,
    padding: 10,
  },
});
