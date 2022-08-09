import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";

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
    minWidth: 130,
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    marginVertical: 5,
    alignItems: "center",
    borderRadius: 5,
  },
  container_PRIMARY: {
    backgroundColor: "#F2A337",
  },
  container_SECONDARY: {
    width: "1%",
    minWidth: 10,
    paddingTop: 0,
    paddingBottom: 0,
    marginVertical: 0,
    paddingRight: 10,
    alignItems: "flex-start",
  },
  container_TERTIARY: {
    width: "100%",
    paddingTop: 0,
    paddingBottom: 5,
  },
  text_PRIMARY: {
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  text_SECONDARY: {
    fontWeight: "bold",
    color: "#202020",
    fontSize: 20,
  },
  text_TERTIARY: {
    fontWeight: "bold",
    color: "#202020",
  },
});

export default CustomButton;
