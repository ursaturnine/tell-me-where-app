import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import useFriendData from "../hooks/useFriendData";
import { AuthContext } from "../context/AuthContext";
import tellMeWhereApi from "../api/tell-me-where-api";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";

const FriendsScreen = ({}) => {
  const { userID } = useContext(AuthContext);
  const [friendSearch, setFriendSearch] = useState("");
  const [errorMessage, friendData, setFriendData] = useFriendData();

  const searchFriendApi = async () => {
    try {
      const response = await tellMeWhereApi.get("/users/usernames", {
        params: { username: `${friendSearch}` },
      });
      console.log(response.data);
      const userIDResponse = response.data["user"]["id"];
      return userIDResponse;
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const addFriendApi = async (id) => {
    try {
      const response = await tellMeWhereApi.patch(`/users/${userID}/follow`, {
        id,
      });
      const friendDataResponse = response.data["user"]["friends"];
      setFriendData(friendDataResponse);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const onButtonPressed = async () => {
    console.log("The Button Was Pressed");
    const friendId = await searchFriendApi();
    addFriendApi(friendId);
    setFriendSearch("");
  };

  console.log(`friend data before is ${friendData}`);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friends</Text>
      {errorMessage ? <Text> {errorMessage} </Text> : null}
      <InputForm
        placeholder="Username"
        value={friendSearch}
        setValue={setFriendSearch}
      />
      <CustomButton
        text="Add Friend"
        onPress={onButtonPressed}
        type="PRIMARY"
      />
      <ScrollView>
        {friendData.map((friend) => (
          <View key={friend.id} style={styles.user_container}>
            <Text style={styles.user_text}>{friend.username}</Text>
          </View>
        ))}
      </ScrollView>
      {/* <ScrollView>
        {friendData.map((friend) => (
          <View key={friendData.id} style={styles.user_container}>
            <Text style={styles.user_text}>{friend.username}</Text>
          </View>
        ))}
      </ScrollView> */}
      {/* <FlatList
        data={friendData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(friend) => friend.username}
        renderItem={({ item }) => {
          return <Text style={styles.bodyText}>{item.name}</Text>;
        }} */}
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

export default FriendsScreen;
