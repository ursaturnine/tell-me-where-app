import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import useRestaurants from "../hooks/useRestaurants";
import ResultsList from "../components/ResultsList";
import tellmewhere from "../api/tell-me-where-api";
import useUserRecs from "../hooks/useUserRecs";
import BottomTabNavigator from "../components/BottomTabNavigator";

const HomeScreen = ({}) => {
  const [errorMessage, recs] = useUserRecs();
  return (
    // <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen/Feed</Text>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      {/* <Text>User Recs: {recs}</Text> */}
      <FlatList
        data={recs}
        showsVerticalScrollIndicator={false}
        keyExtractor={(rec) => rec.id}
        renderItem={({ item }) => {
          return <Text style={styles.bodyText}>{item.name}</Text>;
        }}
      />
      <ResultsList title="User Recs" />
    </View>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
  },
  header: {
    fontSize: 32,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  bodyText: {
    marginVertical: 50,
  },
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default HomeScreen;
