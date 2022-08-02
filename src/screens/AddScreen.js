import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import CustomButton from "../components/CustomButton";
import InputForm from "../components/InputForm";

const AddScreen = ({}) => {
  const [city, setCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onButtonPressed = () => {
    console.log("The Button Was Pressed");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Add a Recommendation</Text>
      <InputForm placeholder="City" value={city} setValue={setCity} />
      <InputForm
        placeholder="Restaurant Name"
        value={searchTerm}
        setValue={setSearchTerm}
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
