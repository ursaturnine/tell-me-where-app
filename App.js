import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";
import { AuthContext } from "./src/context/AuthContext";

export default function App() {
  const userContext = {
    user: null,
    isSignedIn: false,
    user_id: null,
  };

  return (
    <AuthContext.Provider value={userContext}>
      <NavigationContainer>
        {userContext.user ? <BottomTabNavigator /> : <StackNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
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
