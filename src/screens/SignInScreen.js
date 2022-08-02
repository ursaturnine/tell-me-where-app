import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  const onSignInPressed = () => {
    console.log("The Sign In Button Was Pressed");
    logInApi();
    // navigation.navigate("Home");
  };

  const logInApi = async () => {
    try {
      const response = await tellMeWhereApi.post("/users/usernames", {
        username,
      });
      //list of dicts (users)
      console.log(response.data);
      userContext.username = response.data["user"]["username"];
      console.log(`username is ${userContext.username}`);
    } catch (err) {
      console.log(`${err}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Sign In</Text>
      <InputForm
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      {/* <InputForm
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={true}
      /> */}
      <CustomButton text="Sign In" onPress={onSignInPressed} type="PRIMARY" />
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

export default SignInScreen;
