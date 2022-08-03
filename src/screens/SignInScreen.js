import React, { useState, useContext } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

const SignInScreen = () => {
  const { username } = useContext(AuthContext);
  const { setUsername } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);

  const onSignInPressed = () => {
    logInApi();
  };

  // .get('https://weather-report-proxy-lili4x4.herokuapp.com/location', {
  //     params: { q: `${location}` },
  //   })

  const logInApi = async () => {
    try {
      const response = await tellMeWhereApi.get("/users/usernames", {
        params: { username: `${username}` },
      });
      console.log(response.data);
      const usernameResponse = response.data["user"]["username"];
      const userIDResponse = response.data["user"]["id"];
      setUsername(usernameResponse);
      setUserID(userIDResponse);
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
