import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import useRecsDisplay from "../hooks/useRecsDisplay";
import yelpApi from "../api/yelp";

const SearchScreen = ({}) => {
  const [location, setLocation] = useState("");
  const { userID } = useContext(AuthContext);
  const [friend, setFriend] = useState("");
  const [noResults, setNoResults] = useState("");
  const [recs, setRecs] = useState([]);

  //get friends ids
  const getFriendsIds = async () => {
    const resp = await tellMeWhereApi.get(`users/${userID}`);
    const friends = resp.data.user.friends.map((friend) => friend.id);
    getRecsByLocation(friends);
  };

  // get friends recs with matching locations by ids
  const getRecsByLocation = async (friends) => {
    //for each friend id, get friend.recs
    const friend_recs = Promise.all(
      friends.map(async (friend) => {
        let resp = await tellMeWhereApi.get(`users/${friend}`);
        return resp.data.user.recs;
      })
    );
    //if location in friends recs send to api call to grab recs
    const all_friends = await friend_recs;
    console.log(all_friends);
    const results = Promise.all(
      all_friends.map((friend) =>
        friend.map(async (rec) => {
          if (rec.location_city) {
            console.log("yes");
            if (
              location == rec.location_city.toLowerCase() ||
              location == rec.location_state.toLowerCase()
            ) {
              setRecs([...recs, rec]);
              // setRecs(rec);
              console.log(rec);
              // console.log(rec);
              //send friend id to api call to grab recs
              rec.users.map((user) => {
                setFriend(user.username);
              });
            }
          } else if (rec.yelp_id) {
            //if not, grab location for friend id with yelp API
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
    console.log("yelp call");
    // const resp = await yelpApi.get(`/search`);
    // if (id in resp.data.id) {
    //   if (
    //     resp.data.location.city === location ||
    //     resp.data.location.state === location
    //   ) {
    //     console.log("yelp-api");
    //     displayFriendRecs(id);
    //   }
    // }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.header}>Search Screen</Text>
        <InputForm
          placeholder="Search location..."
          value={location}
          setValue={setLocation}
        />
        <CustomButton
          onPress={getFriendsIds}
          text="Tell Me Where"
          type="PRIMARY"
        />
      </View>
      <Text>{noResults ? noResults : ""}</Text>
      <Text style={styles.textStyle}>
        {friend ? "Your Friend Recommendations" : ""}
      </Text>

      <View style={styles.scroll_container}>
        <ScrollView>
          {console.log(recs)}
          {recs.map((rec) => {
            <View style={styles.user_container}>
              <View style={styles.rec}>
                <Text style={styles.user_text}>
                  {" "}
                  {rec.location_city},{""}
                  {rec.location_state}
                </Text>
                <Text style={styles.user_text}> {rec.restaurant_name}</Text>
                <Text style={styles.user_text}>
                  {" "}
                  {rec.category1},{""}
                  {rec.category2},{""}
                  {rec.category3},
                </Text>
                <Text style={styles.user_text}> {rec.price}</Text>
              </View>
            </View>;
          })}
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
  scroll_container: {
    flex: 2,
    backgroundColor: "#e5e5e5",
  },
  header: {
    fontSize: 32,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
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
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  rec: {
    margin: 5,
  },
  user_text: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 1,
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
});

export default SearchScreen;
