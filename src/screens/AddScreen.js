import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import useRecs from "../hooks/useRecs";

const AddScreen = ({}) => {
  const [location, setLocation, search, setSearch, addRecApi] = useRecs();

  const onButtonPressed = () => {
    console.log("The Button Was Pressed");
    addRecApi();
  };

  return (
    <View style={styles.container}>
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
  );
};

const styles = StyleSheet.create({
  container: {
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
  buttons: {
    backgroundColor: "#7F00FF",
  },
});

export default AddScreen;
