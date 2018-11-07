// import React, { Component } from 'react';
// import Dimensions from 'Dimensions';
// import {
//   StyleSheet,
//   TouchableOpacity,
//   Text,
//   Animated,
//   View,
// } from 'react-native';

// export default class ButtonSubmit extends Component {

//   render() {
//     return (
//       <View style={styles.container}>
//         <TouchableOpacity
//           style={styles.button}
//           onPress={this.props.onClick}
//           activeOpacity={1}>
//           <Text style={styles.text}>LOGIN</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     top: 180
//   },
//   button: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#e84224',
//     marginRight: '5%',
//     marginLeft: '5%',

//     borderRadius: 20,
//     padding: 10,
//     width: '90%'
//   },
//   text: {
//     color: 'white',
//     backgroundColor: 'transparent',
//   },
//   image: {
//     width: 24,
//     height: 24,
//   },
// });

import React, { Component } from 'react';
import Dimensions from 'Dimensions';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Animated,
  View,
} from 'react-native';

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;
const MARGIN = 40;

export default class ButtonSubmit extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
    };

    this.buttonAnimated = new Animated.Value(0);
    this.growAnimated = new Animated.Value(0);
  }

  _onPress() {
    if (this.state.isLoading) return;
    this.setState({ isLoading: true });
  }

  render() {
    const changeWidth = this.buttonAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [DEVICE_WIDTH - MARGIN, MARGIN],
    });
    const changeScale = this.growAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [1, MARGIN],
    });

    return (
      <View style={styles.container}>
        <Animated.View style={{ width: changeWidth }}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.props.onClick}
            activeOpacity={1}>
            {this.state.isLoading ? (
              <Text style={styles.text}>Loading</Text>
            ) : (
                <Text style={styles.text}>LOGIN</Text>
              )}
          </TouchableOpacity>
          <Animated.View
            style={[styles.circle, { transform: [{ scale: changeScale }] }]}
          />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    top: 140,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: MARGIN,
    borderRadius: 20,
    zIndex: 100,
  },
  circle: {
    height: MARGIN,
    width: MARGIN,
    marginTop: -MARGIN,
    borderWidth: 1,
    borderColor: '#F035E0',
    borderRadius: 100,
    alignSelf: 'center',
    zIndex: 99,
    backgroundColor: '#F035E0',
  },
  text: {
    color: 'white',
    backgroundColor: 'transparent',
  },
  image: {
    width: 24,
    height: 24,
  },
});