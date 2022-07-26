import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FeedScreen from "../screens/FeedScreen";
import AddScreen from "../screens/AddScreen";
import { Text, StyleSheet, View, Button, Image } from "react-native";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: "flex",
          },
          {
            position: "absolute",
            bottom: 25,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: "orange",
            borderRadius: 15,
            height: 90,
            // ...styles.shadow,
          },
        ],
        headerStyle: {
          backgroundColor: "orange",
        },
        headerTintColor: "white",
        headerTitleStyle: {
          fontWeight: "bold",
          fontFamily: "Avenir-Oblique",
        },
      }}
    >
      <BottomTab.Screen name="Home" component={HomeScreen}></BottomTab.Screen>
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Friend Activity"
        component={FeedScreen}
      ></BottomTab.Screen>
      <BottomTab.Screen name="Add" component={AddScreen}></BottomTab.Screen>
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigator;
