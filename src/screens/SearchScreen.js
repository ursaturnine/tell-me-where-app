import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
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

  //show error message
  useEffect(() => {
    showError();
  }, [recs]);

  //get friends ids
  const getFriendsIds = async () => {
    setIsLoading(true);

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
  };

  //show error message
  const showError = async () => {
    if (location && recs.length === 0) {
      setNoResults(`There are no recs for ${location}`);
    } else {
      setNoResults("");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.header}>Get Recommendations</Text>
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
      <View style={styles.scroll_container}>
        <FlatList
          data={recs}
          keyExtractor={(rec) => rec.id.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style={styles.user_container}>
                <Text style={styles.user_text}>
                  <Text style={styles.friend_header}>
                    {item.users.map((user) => `${user.username} recommends...`)}
                  </Text>
                  <Text style={styles.user_heading}>
                    {"\n"}
                    {item.restaurant_name}
                  </Text>
                  <View style={styles.rec}>
                    <Image
                      style={styles.images}
                      source={{ uri: item.image_url }}
                    />

                    <View style={styles.recCategories}>
                      <Text style={styles.user_text}> {item.category1}</Text>
                      {item.category2 && (
                        <Text style={styles.user_text}>
                          {" "}
                          | {item.category2}
                        </Text>
                      )}
                      {item.category3 && (
                        <Text style={styles.user_text}>
                          {" "}
                          | {item.category3}
                        </Text>
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
                  </View>
                </Text>
              </View>
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
    paddingTop: 0,
    marginTop: 0,
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    marginBottom: 0,
  },
  user_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F99245",
    padding: 5,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 8,
  },
  header: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  user_text: {
    paddingTop: 5,
  },
  user_heading: {
    fontSize: 20,
    fontWeight: "bold",
  },
  textStyleTitle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    textAlign: "center",
  },
  images: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  rec: {
    margin: 5,
  },
  recTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  recCategories: {
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingRight: 0,
  },
  loading: {
    marginTop: 10,
    padding: 0,
  },
});

export default SearchScreen;
