import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <Button title="Get Data From Database" onPress={GetData} /> */}
      <BottomTabNavigator />
      {/* <StatusBar style="auto" /> */}
      {/* </View> */}
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
