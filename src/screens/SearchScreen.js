import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import useRecsDisplay from "../hooks/useRecsDisplay";

const SearchScreen = ({}) => {
  const [getUserRecs] = useRecsDisplay();
  const [location, setLocation] = useState("");
  const { userID } = useContext(AuthContext);
  const [friendRecs, setFriendRecs] = useState([]);

  //get friends ids
  const getFriendsIds = async () => {
    const resp = await tellMeWhereApi.get(`users/${userID}`);
    const friends = resp.data.user.friends.map((friend) => friend.id);
    getRecsByLocation(friends);
  };

  // get friends recs with matching locations by ids
  const getRecsByLocation = async (friends) => {
    console.log(friends);
    const friend_recs = Promise.all(
      friends.map(async (friend) => {
        console.log(friend);
        let resp = await tellMeWhereApi.get(`users/${friend}`);
        return resp.data.user.recs;
      })
    );
    const all_friend_recs = await friend_recs;
    console.log(all_friend_recs);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Search Screen</Text>
      <InputForm
        placeholder="Search Restaurant..."
        value={location}
        setValue={setLocation}
      />
      <CustomButton
        onPress={getFriendsIds}
        text="Tell Me Where"
        type="PRIMARY"
      />
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
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default SearchScreen;
