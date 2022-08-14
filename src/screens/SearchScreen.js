import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SectionList,
} from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

const SearchScreen = ({}) => {
  const [location, setLocation] = useState("");
  const { userID } = useContext(AuthContext);
  const [noResults, setNoResults] = useState("");
  const [recs, setRecs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [topRec, setTopRec] = useState("");

  //show error message
  useEffect(() => {
    showError();
  }, [recs]);

  //get friends ids
  const getFriendsIds = async () => {
    setIsLoading(true);
    if (recs) {
      setRecs([]);
      setTopRec("");
    }
    const resp = await tellMeWhereApi.get(`users/${userID}`);
    const friends = resp.data.user.friends.map((friend) => friend.id);
    getRecsByLocation(friends);
    setIsLoading(false);
    return friends;
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
    // recs_of_friends = await results

    const results = Promise.all(
      all_friends.map(async (friend) =>
        friend.map((rec) => {
          if (
            location.toLowerCase() == rec.location_city.toLowerCase() ||
            location.toLowerCase() == rec.location_state.toLowerCase()
          ) {
            //add individual rec to recs_from_friends results list
            recs_of_friends.push(rec);
          }
        })
      )
    );

    //set state variable recs to results list to render
    setRecs(recs_of_friends);
    setLocation("");
    getFavRec(recs_of_friends);
  };

  //show error message
  const showError = async () => {
    if (location && recs.length === 0) {
      setNoResults(`There are no recs for ${location}`);
    } else {
      setNoResults("");
    }
  };

  //display mult recs if rec is in more than two friends' recs list
  const getFavRec = (friend_recs) => {
    let favRecs = [];
    for (let i = 0; i < friend_recs.length; i++) {
      if (favRecs.length === 0) {
        favRecs.push(friend_recs[i]);
        if (favRecs.includes(friend_recs[i])) {
          favRecs.push(friend_recs[i]);
        }
      }
    }
    if (favRecs.length > 1) {
      favRecs = [favRecs[0]];
      console.log(favRecs);
      if (favRecs) {
        favRests(favRecs);
      }
    }
  };

  //takes in list of favRecs and displays
  const favRests = (favs) => {
    const topRestaurant = favs.map((fav) => {
      return (
        <View style={styles.topRecContainer}>
          <Text
            style={styles.topRecText}
          >{`The Top Rec For ${location} is ${fav.restaurant_name}!`}</Text>
          <Image style={styles.topRecImage} source={{ uri: fav.image_url }} />
        </View>
      );
    });
    setTopRec(topRestaurant);
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
        <View style={styles.loading}>
          <ActivityIndicator
            color="orange"
            animating={isLoading}
            size="small"
          />
        </View>
      </View>
      <Text style={styles.textStyle}>{noResults}</Text>

      <Text style={styles.rec}>{topRec}</Text>

      <View style={styles.scroll_container}>
        <FlatList
          data={recs}
          keyExtractor={(rec) => rec.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <Text style={styles.user_container}>
                <Text>
                  {item.users.map((user) => (
                    <Text style={styles.friend_header}>
                      {" "}
                      {user.username} Recommends
                    </Text>
                  ))}
                </Text>
                <View style={styles.rec}>
                  <Image
                    style={styles.images}
                    source={{ uri: item.image_url }}
                  />

                  <View style={styles.recCategories}>
                    <Text style={styles.user_text}> {item.category1}</Text>
                    {item.category2 && (
                      <Text style={styles.user_text}> | {item.category2}</Text>
                    )}
                    {item.category3 && (
                      <Text style={styles.user_text}> | {item.category3}</Text>
                    )}
                  </View>
                  <Text style={styles.user_text}>
                    {item.location_city}, {item.location_state}
                  </Text>
                  <View style={styles.recTop}>
                    <Text style={styles.user_text}> {item.price}</Text>
                    <TouchableOpacity
                      type="SECONDARY"
                      onPress={() => {
                        Linking.openURL(item.yelp_url);
                      }}
                    >
                      <Image
                        source={require("../assets/images/yelp2.png")}
                        resizeMode="contain"
                        style={{
                          width: 25,
                          height: 25,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                  {/* 
                  <Text style={styles.user_text}></Text>
                  <Text style={styles.user_text}>{item.restaurant_name}</Text>
                  <Text style={styles.user_text}>{item.location_city}</Text>
                  <Text style={styles.user_text}>{item.location_state}</Text>
                  <Text style={styles.user_text}>{item.price}</Text> */}
                </View>
              </Text>
            );
          }}
        />
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

  scroll_container: {
    flex: 2,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    marginBottom: 120,
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    marginBottom: 10,
  },
  header: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  user_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F99245",
    padding: 7,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
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
  recTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  user_text: {
    fontSize: 10,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  images: {
    width: 200,
    height: 100,
    borderRadius: 8,
    marginTop: 20,
    marginLeft: 15,
  },
  friend_header: {
    marginLeft: 15,
    fontSize: 10,
    fontWeight: "bold",
    // margin: 10,
  },
  recCategories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 0,
  },
  loading: {
    marginVertical: 10,
    padding: 0,
  },
  topRecImage: {
    width: 200,
    height: 100,
    borderRadius: 8,
    margin: 2,
    marginTop: 2,
  },
  topRecText: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 15,
  },
  topRecContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SearchScreen;
