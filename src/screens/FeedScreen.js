import React from "react";
import { Text, StyleSheet, View, Image, FlatList } from "react-native";

const FeedScreen = ({}) => {
  const friends = [
    { name: "Tyrah" },
    { name: "Lili" },
    { name: "Emily" },
    { name: "Ashley" },
    { name: "Shayla" },
    { name: "Ivana" },
  ];
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Friends</Text>
      <FlatList
        data={friends}
        showsVerticalScrollIndicator={false}
        keyExtractor={(friend) => friend.name}
        renderItem={({ item }) => {
          return <Text style={styles.bodyText}>{item.name}</Text>;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
  },
  textStyle: {
    fontSize: 30,
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

export default FeedScreen;
