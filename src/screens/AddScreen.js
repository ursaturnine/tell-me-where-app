import React, { useState, useContext } from "react";
import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";
import useRecs from "../hooks/useRecs";
import useRecsDisplay from "../hooks/useRecsDisplay";

const AddScreen = ({}) => {
  const [location, setLocation, search, setSearch, addRecApi] = useRecs();
  const [recs, getUserRecs] = useRecsDisplay();

  const onButtonPressed = async () => {
    await addRecApi().then(getUserRecs);
    setSearch("");
    setLocation("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.form_container}>
        <Text style={styles.textStyle}>Add a Recommendation</Text>
        <InputForm placeholder="City" value={location} setValue={setLocation} />
        <InputForm
          placeholder="Restaurant Name"
          value={search}
          setValue={setSearch}
        />
        <CustomButton
          text="Add Recommendation"
          onPress={onButtonPressed}
          type="PRIMARY"
        />
      </View>
      <View style={styles.scroll_container}>
        <Text style={styles.textStyle}>Your Recommendations</Text>
        <ScrollView>
          {recs.map((rec) => (
            <View key={rec.id} style={styles.user_container}>
              <View style={styles.rec}>
                <Image style={styles.images} source={{ uri: rec.image_url }} />
                <Text style={styles.user_text}>
                  {" "}
                  {rec.location_city},{rec.location_state}
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
  },
  scroll_container: {
    flex: 2,
    backgroundColor: "#e5e5e5",
  },
  form_container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
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
  images: {
    width: 300,
    height: 200,
    borderRadius: 8,
  },
  rec: {
    margin: 5,
  },
  user_text: {
    fontWeight: "bold",
    fontSize: 15,
    margin: 1,
  },
});

export default AddScreen;
