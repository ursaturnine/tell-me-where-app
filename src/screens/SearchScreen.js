import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  SectionList,
} from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

const SearchScreen = ({}) => {
  const [location, setLocation] = useState("");
  const { userID } = useContext(AuthContext);
  const [friend, setFriend] = useState("");
  const [noResults, setNoResults] = useState("");
  const [recs, setRecs] = useState([]);

  //get friends ids
  const getFriendsIds = async () => {
    if (recs) {
      setRecs([]);
    }
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
    //if location in friends add to recs list
    const all_friends = await friend_recs;
    //recs list
    let recs_of_friends = [];
    //username list
    let friend_users = [];
    const results = Promise.all(
      all_friends.map((friend) =>
        friend.map(async (rec) => {
          if (rec.location_city) {
            if (
              location == rec.location_city.toLowerCase() ||
              location == rec.location_state.toLowerCase()
            ) {
              //display friend name who rec belongs to
              rec.users.map((user) => {
                // friend_users.push(user.username);
              });
              //add individual rec to recs_from_friends results list
              recs_of_friends.push(rec);
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
    //set state variable recs to results list to render
    setRecs(recs_of_friends);
    // setFriend(friend_users);
    setLocation("");
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
    // console.log("yelp call");
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
      <View style={styles.scroll_container}>
        <FlatList
          data={recs}
          // keyExtractor={(rec) => recid.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Text style={styles.user_container}>
                {console.log(item)}
                {console.log(item.restaurant_name)}
                {console.log(friend)}
                {console.log(recs)}
                <View style={styles.rec}>
                  <Image
                    style={styles.images}
                    source={{ uri: item.image_url }}
                  />
                  {/* <Text style={styles.user_text}>{friend}</Text> */}
                  <Text style={styles.user_text}>{item.restaurant_name}</Text>
                  <Text style={styles.user_text}>{item.location_city}</Text>
                  <Text style={styles.user_text}>{item.location_state}</Text>
                  <Text style={styles.user_text}>{item.price}</Text>
                </View>
              </Text>
            );
          }}
        />
      </View>

      {console.log(recs)}
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
    fontSize: 10,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  images: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
});

export default SearchScreen;
