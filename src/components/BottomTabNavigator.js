import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import FriendsScreen from "../screens/FriendsScreen";
import AddScreen from "../screens/AddScreen";
import { SignOutScreen } from "../screens/SignOutScreen";

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
            ...styles.shadow,
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
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/search.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#B6D0E2" : "#E6E6FA",
                }}
              />
              <Text
                style={{ color: focused ? "#B6D0E2" : "#E6E6FA", fontSize: 12 }}
              >
                Search
              </Text>
            </View>
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/group-add.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#B6D0E2" : "#E6E6FA",
                }}
              />
              <Text
                style={{ color: focused ? "#B6D0E2" : "#E6E6FA", fontSize: 12 }}
              >
                Friends
              </Text>
            </View>
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/add.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#B6D0E2" : "#E6E6FA",
                }}
              />
              <Text
                style={{ color: focused ? "#B6D0E2" : "#E6E6FA", fontSize: 12 }}
              >
                Add
              </Text>
            </View>
          ),
        }}
      ></BottomTab.Screen>
      <BottomTab.Screen
        name="LogOut"
        component={SignOutScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/home.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#B6D0E2" : "#E6E6FA",
                }}
              />
              <Text
                style={{ color: focused ? "#B6D0E2" : "#E6E6FA", fontSize: 12 }}
              >
                Log Out
              </Text>
            </View>
          ),
        }}
      ></BottomTab.Screen>
      {/* <BottomTab.Screen
        name="Sign Up"
        component={SignUpScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                top: 10,
              }}
            >
              <Image
                source={require("../assets/images/group-add.png")}
                resizeMode="contain"
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? "#B6D0E2" : "#E6E6FA",
                }}
              />
              <Text
                style={{ color: focused ? "#B6D0E2" : "#E6E6FA", fontSize: 12 }}
              >
                Sign Up
              </Text>
            </View>
          ),
        }}
      ></BottomTab.Screen> */}
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#B6D0E2",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    opacity: 2.5,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default BottomTabNavigator;
