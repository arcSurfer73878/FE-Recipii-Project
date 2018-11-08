import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Header } from 'react-native-elements'
import userImg from '../assets/userpicture.jpg'
import mitchImg from '../assets/mitchismean.jpeg'

class UserPage extends Component {
  render() {
    return (<ImageBackground
      source={
        require('../assets/white.jpg')
      }
      style={styles = { height: '100%', width: '100%' }}
    >
      <View style={styles = { flex: 1 }}>
        <Header
          outerContainerStyles={{ backgroundColor: '#ffffff' }}
          leftComponent={{ icon: 'keyboard-arrow-left', color: 'black', onPress: () => this.props.navigation.navigate('Home') }}
          centerComponent={{ text: this.props.screenProps.user.username, style: { color: 'black' } }} />
        <View style={styles = { flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles = { padding: 20, flex: 1 }}>
            <Image source={this.props.screenProps.user.username === 'mitchismean' ? mitchImg : userImg} style={styles = { height: 150, width: 150, borderRadius: 75 }} />
          </View>
          <Text></Text>
          <View style={styles = { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles = { fontSize: 18, fontFamily: 'Arial' }}>{this.props.screenProps.user.firstName} {this.props.screenProps.user.lastName} </Text>
            <Text></Text>
            <Text style={styles = { fontSize: 18, fontFamily: 'Arial' }}>{this.props.screenProps.user.email}</Text>
          </View>
          <View style={styles = { flex: 2, padding: 10 }}>
            <TouchableOpacity style={styles = {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#E84224',
              height: 40,
              width: 200,
              borderRadius: 0,
            }} onPress={
              () => this.props.navigation.navigate("App", { login: false })} ><Text style={styles = { color: 'white' }} >Logout</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground >
    );
  }
}

export default UserPage;