import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";
import useRecs from "../hooks/useRecs";
import useRecsDisplay from "../hooks/useRecsDisplay";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import * as Linking from "expo-linking";

const AddScreen = ({}) => {
  const [location, setLocation, search, setSearch, addRecApi, recData] =
    useRecs();
  const [recs, setRecs, getUserRecs] = useRecsDisplay();

  const onButtonPressed = async () => {
    await addRecApi().then(getUserRecs);
    setSearch("");
    setLocation("");
  };

  const deleteRecApi = async (id) => {
    try {
      const response = await tellMeWhereApi.delete(`/recs/${id}`);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const onDeleteButtonPressed = async (recID) => {
    console.log("The Delete Button Was Pressed");
    console.log(`rec id is ${recID}`);
    const response = await deleteRecApi(recID);
    getUserRecs();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.textStyleTitle}>Add a Recommendation</Text>
        <Text>City</Text>
        <InputForm placeholder="City" value={location} setValue={setLocation} />
        <Text>Restaurant Name</Text>
        <InputForm
          placeholder="Restaurant Name"
          value={search}
          setValue={setSearch}
        />
        <CustomButton text="Add" onPress={onButtonPressed} type="PRIMARY" />
      </View>
      <View style={styles.scroll_container}>
        <Text style={styles.textStyle}>Your Recommendations</Text>
        <ScrollView>
          {/* <Text style={styles.textStyle}>{recs["recs"]}</Text> */}
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
          {/* <Text style={styles.textStyle}>{recs}</Text> */}
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
    flex: 2,
    marginTop: 100,
    marginBottom: 120,
    backgroundColor: "#e5e5e5",
    justifyContent: "center",
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
  },
  user_container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#F99245",
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 8,
    width: "90%",
  },
  user_text: {
    paddingTop: 5,
    marginLeft: 10,
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
    marginLeft: 15,
    marginBottom: 15,
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 5,
    marginLeft: 15,
    marginBottom: 5,
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
    paddingLeft: 0,
    paddingRight: 0,
  },
});

export default AddScreen;
