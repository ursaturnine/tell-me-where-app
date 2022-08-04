import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import useRecsDisplay from "../hooks/useRecsDisplay";
import yelpApi from "../api/yelp";

const SearchScreen = ({}) => {
  const [getUserRecs] = useRecsDisplay();
  const [location, setLocation] = useState("");
  const { userID } = useContext(AuthContext);
  const [friendRecs, setFriendRecs] = useState([]);
  const [noResults, setNoResults] = useState("");

  //get friends ids
  const getFriendsIds = async () => {
    const resp = await tellMeWhereApi.get(`users/${userID}`);
    const friends = resp.data.user.friends.map((friend) => friend.id);
    getRecsByLocation(friends);
  };

  //display friend recs
  const displayFriendRecs = async (id) => {
    const resp = await tellMeWhereApi.get(`users/${userID}`);
    console.log(resp.data.user.recs);
    // setFriendRecs(resp.data.user.recs)
  };

  // get friends recs with matching locations by ids
  const getRecsByLocation = async (friends) => {
    // console.log(friends);
    //for each friend id, get friend.recs
    const friend_recs = Promise.all(
      friends.map(async (friend) => {
        // console.log(friend);
        let resp = await tellMeWhereApi.get(`users/${friend}`);
        return resp.data.user.recs;
      })
    );
    //if location in friend.recs.location_city or in friend.recs.location_state: display!
    const all_friends = await friend_recs;
    console.log(all_friends);
    const results = Promise.all(
      all_friends.map((friend) =>
        friend.map(async (rec) => {
          if (rec.location_city) {
            if (
              location in rec.location_city ||
              location in rec.location_state
            ) {
              displayFriendRecs(rec.id);
            }
          } else if (rec.yelp_id) {
            //if not, grab location for friend id with yelp API
            console.log(rec.yelp_id);
            getLocationWithYelp(rec.yelp_id);
          } else {
            setNoResults("");
          }
        })
      )
    );
    //display no results message if no results found
    const friend_location_query =
      (await results) === "undefined" ? false : results;
    if (friend_location_query === false) {
      setNoResults("No Matches");
    } else {
      setNoResults("");
    }
  };

  //get location with yelp id
  const getLocationWithYelp = async (id) => {
    const resp = await yelpApi.get(`/search`);
    if (id in resp.data.id) {
      if (
        resp.data.location.city === location ||
        resp.data.location.state === location
      ) {
        displayFriendRecs(id);
      }
    }
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
      <Text>{noResults ? noResults : ""}</Text>
      <View>
        <ScrollView>
          <View>{friendRecs}</View>
        </ScrollView>
      </View>
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
