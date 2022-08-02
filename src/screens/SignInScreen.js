import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import useLogin from "../hooks/useLogin";
import tellMeWhereApi from "../api/tell-me-where-api";

const SignInScreen = ({}) => {
  const [username, setUsername, logInApi] = useLogin();
  const [errorMessage, setErrorMessage] = useState("");

  const onSignInPressed = async () => {
    console.log("The Sign In Button Was Pressed");
    const response = await tellMeWhereApi.get("/users");

    response.data.map((resp) => {
      if (username === resp.username) {
        return logInApi();
      } else {
        setErrorMessage("");
      }
    });

    return setErrorMessage(`User ${username} does not exist`);
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
      <Text>{errorMessage ? errorMessage : ""}</Text>
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
