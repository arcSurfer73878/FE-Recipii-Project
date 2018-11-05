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
          <Text>
            {" "}
            You have{" "}
            {shoppingList.length}
            {' '}items left to buy
          </Text>
        </View>
        <ScrollView>
          {shoppingList.map(ingredient => {
            return (
              <View key={ingredient._id}>
                <CheckBox
                  title={ingredient.name}
                  checked={this.state.checked}
                  onPress={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                />
                <Text>amount: {ingredient.amount}{' '}{ingredient.amount > 1 && ingredient.units === "tin" && "can" || "" ? ingredient.units + 's' : ingredient.units}</Text>
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
        "https://scranner123.herokuapp.com/api/shopping-lists/5be055751d089848b0d05f9b"
      )
      .then(response => {
        this.setState({
          shoppingList: response.body.shoppingList.ingredients
        })
      });
  }
}
