import React from "react";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";

const CustomButton = ({ onPress, text, type }) => {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles[`container_${type}`]]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "30%",
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#F2A337",
  },
  container_TERTIARY: {},
  text_PRIMARY: {
    fontWeight: "bold",
    color: "#white",
  },
  text_TERTIARY: {
    fontWeight: "bold",
    color: "#grey",
  },
});

export default CustomButton;
