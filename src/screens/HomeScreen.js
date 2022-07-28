import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import yelp from "../api/yelp";

const HomeScreen = ({}) => {
  const [restaurants, setRestaurants] = useState([]);

  //get request from Yelp
  const searchApi = async () => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          location: "Seattle, WA",
        },
      });
      setRestaurants(response.data.businesses);
    } catch (err) {
      console.log(`The yelp Api was not called:  ${err}`);
    }
  };

  //grab search results when first rendered
  useEffect(() => {
    searchApi();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen/Feed</Text>
      <Text>We have found {restaurants.length}</Text>
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
  bodyText: {
    marginVertical: 50,
  },
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default HomeScreen;
