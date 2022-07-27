import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const HomeScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Home Screen/Feed</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e5e5e5",
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    fontFamily: "Avenir-Oblique",
  },
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default HomeScreen;
