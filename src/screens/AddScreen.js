import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";

const AddScreen = ({}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Add Rec Screen</Text>
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

export default AddScreen;
