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
  const [errorMessage, users] = useUserRecs();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen/Feed</Text>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.user_container}>
            <Text style={styles.user_text}>User: {user.username}</Text>
          </View>
        ))}
      </ScrollView>
      <ResultsList title="User Recs" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  header: {
    fontSize: 32,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  user_text: {
    fontWeight: "bold",
  },
  user_container: {
    flex: 1,
    backgroundColor: "#F99245",
    padding: 30,
    marginVertical: 10,
    borderRadius: 8,
    width: "50%",
    marginLeft: 10,
  },
});

export default HomeScreen;
