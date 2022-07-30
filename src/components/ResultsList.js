import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default ({ title }) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
