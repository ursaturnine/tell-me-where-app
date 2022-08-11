import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  ScrollView,
  Button,
} from "react-native";
import useFriendData from "../hooks/useFriendData";
import { AuthContext } from "../context/AuthContext";
import tellMeWhereApi from "../api/tell-me-where-api";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";

const FriendsScreen = ({}) => {
  const { userID } = useContext(AuthContext);
  const [friendSearch, setFriendSearch] = useState("");
  const [errorMessage, friendData, setFriendData, setErrorMessage] =
    useFriendData();

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
      setErrorMessage(err);
    }
  };

  const onButtonPressed = async () => {
    const friendId = await searchFriendApi();
    addFriendApi(friendId);
    setFriendSearch("");
  };

  const deleteFriendApi = async (id) => {
    try {
      const response = await tellMeWhereApi.patch(`/users/${userID}/unfollow`, {
        id,
      });
      const friendDataResponse = response.data["user"]["friends"];
      setFriendData(friendDataResponse);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const onUnfollowButtonPressed = (friendID) => {
    console.log("The Unfollow Button Was Pressed");
    console.log(`friend id is ${friendID}`);
    deleteFriendApi(friendID);
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
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
      </View>
      <View style={styles.scroll_container}>
        <ScrollView>
          {friendData.map((friend) => (
            <View key={friend.id} style={styles.user_container}>
              <Text style={styles.user_text}>{friend.username}</Text>
              <CustomButton
                text="X"
                onPress={() => onUnfollowButtonPressed(friend.id)}
                type="SECONDARY"
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
  },
  header: {
    fontSize: 32,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    // marginLeft: 15,
    textAlign: "center",
  },
  bodyText: {
    // marginVertical: 50,
    textAlign: "center",
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    // height: 400,
    marginBottom: 10,
    paddingBottom: 5,
    // height: "150%",
    // marginTop: 300,
  },
  user_text: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 15,
  },
  user_container: {
    backgroundColor: "#F99245",
    padding: 30,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  scroll_container: {
    flex: 3,
    paddingTop: 10,
    marginTop: 10,
    marginBottom: 120,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    flexDirection: "column",
    textAlign: "center",
  },
});

export default FriendsScreen;
