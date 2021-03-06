import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ImageBackground,
  TouchableOpacity
} from "react-native";
import { Header } from 'react-native-elements'
import userImg from '../assets/userpicture.jpg'

class UserPage extends Component {
  render() {
    return (<ImageBackground
      source={
        require('../assets/photo-recipe.png')
      }
      style={styles = { height: '100%', width: '100%' }}
    >
      <View style={styles = { flex: 1 }}>
        <Header
          outerContainerStyles={{ backgroundColor: '#ffffff' }}
          leftComponent={{ icon: 'keyboard-arrow-left', color: 'black', onPress: () => this.props.navigation.navigate('Home') }}
          centerComponent={{ text: this.props.user.username, style: { color: 'black' } }} />
        <View style={styles = { flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View style={styles = { padding: 20, flex: 1 }}>
            <Image source={!this.props.user.profilePicture ? userImg : this.props.user.profilePicture} style={styles = { height: 150, width: 150, borderRadius: 75 }} />
          </View>
          <Text></Text>
          <View style={styles = { flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles = { fontSize: 18, fontFamily: 'Arial' }}>{this.props.user.firstName} {this.props.user.lastName} </Text>
            <Text></Text>
            <Text style={styles = { fontSize: 18, fontFamily: 'Arial' }}>{this.props.user.email}</Text>
          </View>
          <View style={styles = { flex: 2, padding: 10 }}>
            <TouchableOpacity style={styles = {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'orange',
              height: 40,
              width: 200,
              borderRadius: 0,
            }} ><Text style={styles = { color: 'white' }}>Edit</Text></TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={styles = {
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'orange',
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