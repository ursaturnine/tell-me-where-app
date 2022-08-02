import React from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import useUserRecs from "../hooks/useUserRecs";

const FeedScreen = ({}) => {
  // const friends = [
  //   { name: "Tyrah" },
  //   { name: "Lili" },
  //   { name: "Emily" },
  //   { name: "Ashley" },
  //   { name: "Shayla" },
  //   { name: "Ivana" },
  // ];
  // return (
  // <View style={styles.container}>
  //   <Text style={styles.textStyle}>Friends</Text>
  //   {/* <FlatList
  //     data={friends}
  //     showsVerticalScrollIndicator={false}
  //     keyExtractor={(friend) => friend.name}
  //     renderItem={({ item }) => {
  //       return <Text style={styles.bodyText}>{item.name}</Text>;
  //     }}
  //   /> */}
  // </View>
  const [errorMessage, users] = useUserRecs();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      <ScrollView>
        {users.map((user) => (
          <View key={user.id} style={styles.user_container}>
            <Text style={styles.user_text}>User: {user.friends}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
  // );
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

export default FeedScreen;
