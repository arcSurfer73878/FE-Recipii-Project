import React from "react";
import { Text, View, ScrollView, Button, Image } from "react-native";
import { Header, CheckBox } from "react-native-elements";
import Frisbee from "frisbee";

export default class BasketPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Basket"
  };
  state = {
    shoppingList: [],
  };
  render() {
    const shoppingList = this.state.shoppingList
    return (
      <View>
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
            return (
              <View key={ingredient._id}>
                <CheckBox
                  key={index}
                  title={ingredient.name}
                  checked={this.state.shoppingList[index].isChecked}
                  onPress={() =>
                    this.handlePress(index)
                  }
                />
                <Text style={{ textAlign: 'right', marginRight: '5%' }}>amount: {ingredient.amount}{' '}{ingredient.amount > 1 && ingredient.units === "tin" && "can" || "" ? ingredient.units + 's' : ingredient.units}</Text>
              </View>
            )
          })}
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

  componentDidMount() {
    const api = new Frisbee({
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
    api
      .get(
        "https://scranner123.herokuapp.com/api/shopping-lists/5be055751d089848b0d05f9b"
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
