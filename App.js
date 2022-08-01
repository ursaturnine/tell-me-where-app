import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";

export default function App() {
  return (
    <NavigationContainer>
      {/* <BottomTabNavigator /> */}
      <StackNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
