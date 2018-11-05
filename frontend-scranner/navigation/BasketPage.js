import React from "react";
import { Text, View, ScrollView, Button, Image } from "react-native";
import { Header, CheckBox } from "react-native-elements";
import Frisbee from "frisbee";

export default class BasketPage extends React.Component {
  static navigationOptions = {
    tabBarLabel: "Basket"
  };
  state = {
    checked: false,
    shoppingList: [],
  };
  render() {
    const allIngredients = []
    this.state.shoppingList.map(shopping => {
      shopping.ingredients.map(ingredient => allIngredients.push(ingredient.name))
    })
    const individualIngredient = Array.from(new Set(allIngredients))
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
            icon: "face",
            color: "black",
            onPress: () => this.props.navigation.navigate("User")
          }}
        />
        <View>
          <Text>
            {" "}
            You have{" "}
            {individualIngredient.length}
            {' '}items left to buy
          </Text>
        </View>
        <ScrollView>
          {individualIngredient.map(ingredient => {
            return (
              <View key={Math.random(50)}>
                <CheckBox
                  title={ingredient}
                  checked={this.state.checked}
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <Text>amount: X</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    );
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
        "https://scranner123.herokuapp.com/api/shopping-lists/5bdc70fed1830c1a584407ac"
      )
      .then(response => {
        this.setState({
          shoppingList: response.body.recipes
        })
      });
  }
}
