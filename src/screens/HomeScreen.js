import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import useRestaurants from "../hooks/useRestaurants";
import ResultsList from "../components/ResultsList";

const HomeScreen = ({}) => {
  const [errorMessage, restaurants] = useRestaurants();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen/Feed</Text>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      <Text>We have found {restaurants.length}</Text>
      <ResultsList title="Cost Effective" />
      <ResultsList title="Bit Pricier" />
      <ResultsList title="Big Spender" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  header: {
    fontSize: 32,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  bodyText: {
    marginVertical: 50,
  },
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default HomeScreen;
