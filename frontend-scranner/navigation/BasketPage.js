import React from "react";
import { Text, View, ScrollView, Button, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Header, CheckBox } from "react-native-elements";
import { NavigationEvents } from 'react-navigation'
import Frisbee from "frisbee";

export default class BasketPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Basket"
  };
  state = {
    shoppingList: [],
    isFocused: false,
  };
  onDidFocus = () => {
    this.setState({ isFocused: true })
  }
  onDidBlur = () => {
    this.setState({ isFocused: false }
    )
  }
  render() {
    const shoppingList = this.state.shoppingList
    const numberItems = shoppingList.reduce((acc, check) => {
      if (check.amount > 0 && check.isChecked === false) { acc++ }
      return acc
    }, 0)
    return (
      <View>
        <NavigationEvents onDidFocus={this.onDidFocus} onDidBlur={this.onDidBlur} />
        <Header
          outerContainerStyles={{ backgroundColor: "#ffffff" }}
          leftComponent={{
            icon: "camera-alt",
            color: "black",
            onPress: () => this.props.navigation.navigate("Camera")
          }}
          centerComponent={{ text: "Basket", style: { color: "black" } }}
          rightComponent={{
            icon: "person",
            color: "black",
            onPress: () => this.props.navigation.navigate("User")
          }}
        />
        <ImageBackground source={require("../assets/white.jpg")}
          style={{
            height: "100%",
            width: "100%"
          }}>
          <View style={{ alignItems: "center" }}>
            {numberItems <= 0
              ? <Text style={{ margin: '5%', fontSize: 18, fontFamily: 'Courier', color: 'black' }}>Your Basket is empty</Text>
              : <Text style={{ margin: '5%', fontSize: 18, fontFamily: 'Courier', color: 'black' }}>
                {" "}
                You have{" "}
                {numberItems}
                {' '}items left to buy
          </Text>}
          </View>
          <ScrollView>
            {shoppingList.map((ingredient, index) => {
              let item = ingredient.name
                .split(" ")
                .map(word => {
                  return word[0].toUpperCase() + word.slice(1);
                })
                .join(" ")
              return (
                ingredient.amount !== 0 &&
                <View key={ingredient._id}>
                  <CheckBox
                    containerStyle={{ backgroundColor: '#fbfbfb' }}
                    key={index}
                    checkedColor='#E84224'
                    title={item}
                    checked={this.state.shoppingList[index].isChecked}
                    onPress={() =>
                      this.handlePress(index)
                    }
                  />
                  <View style={{ top: -36, right: 5 }}>
                    <Text style={{ textAlign: 'right', marginRight: '5%', color: 'black', fontWeight: "bold" }}>Amount: {ingredient.amount}{' '}{ingredient.amount > 1 && ingredient.units === "tin" && "can" || "" ? ingredient.units + 's' : ingredient.units}</Text>
                  </View>
                </View>
              )
            })}
            {numberItems !== 0 &&
              <View style={{ alignItems: "center", padding: 10 }}>
                <TouchableOpacity onPress={this.deleteBasket}>
                  <Text style={{ color: "red", fontSize: 18 }} >Delete Basket</Text>
                </TouchableOpacity>
              </View>
            }
            <Text style={{ marginBottom: 150 }} />
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }

  handlePress = (index) => {
    const changedBox = this.state.shoppingList[index]
    changedBox.isChecked = !changedBox.isChecked
    const newList = [...this.state.shoppingList]
    this.setState({
      shoppingList: newList
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.isFocused !== this.state.isFocused) this.getBasket()
  }

  componentDidMount() {
    this.getBasket()
  }

  deleteBasket = () => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.del(
      `https://scranner123.herokuapp.com/api/shopping-lists/${this.props.screenProps.user._id}`
    )
      .then(response => {
        this.setState({
          shoppingList: response.body.shoppingList.ingredients
        })
      });
  }

  getBasket = () => {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api.get(
      `https://scranner123.herokuapp.com/api/shopping-lists/${this.props.screenProps.user._id}`
    )
      .then(response => {
        const formattedIngredients = response.body.shoppingList.ingredients.map(ingredient => {
          return { ...ingredient, isChecked: false }
        })
        this.setState({
          shoppingList: formattedIngredients
        })
      });
  }
}
