import React, { useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";
import useRecs from "../hooks/useRecs";
import useRecsDisplay from "../hooks/useRecsDisplay";
import tellMeWhereApi from "../api/tell-me-where-api";
import * as Linking from "expo-linking";

const AddScreen = ({}) => {
  const [location, setLocation, search, setSearch, addRecApi, recData] =
    useRecs();
  const [recs, getUserRecs] = useRecsDisplay();
  const [isLoading, setIsLoading] = useState(false);

  const onButtonPressed = async () => {
    setIsLoading(true);
    console.log(isLoading);
    await addRecApi().then(getUserRecs);
    setSearch("");
    setLocation("");
    setIsLoading(false);
    console.log(isLoading);
  };

  const deleteRecApi = async (id) => {
    try {
      const response = await tellMeWhereApi.delete(`/recs/${id}`);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const onDeleteButtonPressed = async (recID) => {
    const response = await deleteRecApi(recID);
    getUserRecs();
  };

  return (
    <View style={styles.container}>
      <View style={styles.scroll_container}>
        <ScrollView>
          <View style={styles.form_container}>
            <Text style={styles.textStyleTitle}>Add a Recommendation</Text>
            <Text>City</Text>
            <InputForm
              placeholder="City"
              value={location}
              setValue={setLocation}
            />
            <Text>Restaurant Name</Text>
            <InputForm
              placeholder="Restaurant Name"
              value={search}
              setValue={setSearch}
            />
            <CustomButton text="Add" onPress={onButtonPressed} type="PRIMARY" />
          </View>
          <Text style={styles.textStyle}>Your Recommendations</Text>
          {/* <ActivityIndicator color="orange" animating={isLoading} /> */}
          {recs.map((rec) => (
            <View key={rec.id} style={styles.user_container}>
              <View style={styles.rec}>
                <View style={styles.recTop}>
                  <Text style={styles.user_heading}>
                    {" "}
                    {rec.restaurant_name}
                  </Text>
                  <CustomButton
                    text="X"
                    onPress={() => onDeleteButtonPressed(rec.id)}
                    type="SECONDARY"
                  />
                </View>
                <Image style={styles.images} source={{ uri: rec.image_url }} />
                <View style={styles.recCategories}>
                  <Text style={styles.user_text}> {rec.category1}</Text>
                  {rec.category2 && (
                    <Text style={styles.user_text}> | {rec.category2}</Text>
                  )}
                  {rec.category3 && (
                    <Text style={styles.user_text}> | {rec.category3}</Text>
                  )}
                </View>
                <Text style={styles.user_text}>
                  {rec.location_city}, {rec.location_state}
                </Text>
                <View style={styles.recTop}>
                  <Text style={styles.user_text}> {rec.price}</Text>
                  <TouchableOpacity
                    type="SECONDARY"
                    onPress={() => {
                      Linking.openURL(rec.yelp_url);
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
  scroll_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
    marginBottom: 120,
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    marginBottom: 30,
  },
  user_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F99245",
    padding: 5,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 8,
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
    marginBottom: 15,
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
  },
  images: {
    width: 300,
    height: 200,
    borderRadius: 8,
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
});

export default AddScreen;
