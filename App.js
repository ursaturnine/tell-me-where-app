import { StatusBar } from "expo-status-bar";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import BottomTabNavigator from "./src/components/BottomTabNavigator";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./src/components/StackNavigator";
import { AuthContext } from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [username, setUsername] = useState("");
  const [userID, setUserID] = useState(null);

  const retrieveToken = async () => {
    const token = await AsyncStorage.getItem("token");
    return token;
  };

  useEffect(() => {
    const checkToken = async () => {
      const result = await retrieveToken();
      setUserID(JSON.parse(result));
    };
    checkToken();
  }, []);

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
