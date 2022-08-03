import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";

const SearchScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Screen</Text>
      <InputForm placeholder="Search Restaurant..." />
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
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default SearchScreen;
