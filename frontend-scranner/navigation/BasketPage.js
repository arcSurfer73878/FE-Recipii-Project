import React from "react";
import { Text, View, ScrollView, Button, Image, TouchableOpacity } from "react-native";
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
        <View>
          <Text style={{ margin: '5%', fontSize: 18, fontFamily: 'Courier' }}>
            {" "}
            You have{" "}
            {shoppingList.reduce((acc, check) => {
              if (check.isChecked === false) { acc++ }
              return acc
            }, 0)}
            {' '}items left to buy
          </Text>
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
              <View key={ingredient._id}>
                <CheckBox
                  key={index}
                  title={item}
                  checked={this.state.shoppingList[index].isChecked}
                  onPress={() =>
                    this.handlePress(index)
                  }
                />
                <Text style={{ textAlign: 'right', marginRight: '5%' }}>amount: {ingredient.amount}{' '}{ingredient.amount > 1 && ingredient.units === "tin" && "can" || "" ? ingredient.units + 's' : ingredient.units}</Text>
              </View>
            )
          })}
          {!this.state.shoppingList.length < 1 &&
            <View style={{ alignItems: "center", padding: 10 }}>
              <TouchableOpacity onPress={this.deleteBasket}>
                <Text style={{ color: "red", fontSize: 18 }} >Delete Basket</Text>
              </TouchableOpacity>
            </View>
          }
          <Text style={{ marginBottom: '30%' }} />
        </ScrollView>
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
