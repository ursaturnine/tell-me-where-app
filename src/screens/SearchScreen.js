import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const SearchScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Search Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default SearchScreen;
