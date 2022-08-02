import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";
import { AuthContext } from "./src/context/AuthContext";

export default function App() {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState(null);

  return (
    <AuthContext.Provider value={{ username, setUsername, userID, setUserID }}>
      <NavigationContainer>
        {userID ? <BottomTabNavigator /> : <StackNavigator />}
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
