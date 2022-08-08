import React, { useState, useContext } from "react";
import { Text, StyleSheet, View } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignInScreen = ({}) => {
  const { username } = useContext(AuthContext);
  const { setUsername } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigation = useNavigation();

  const [loaded] = useFonts({
    DancingScript: require("../assets/fonts/DancingScript.ttf"),
  });

  if (!loaded) {
    return null;
  }

  const onSignInPressed = async () => {
    await logInApi();
    AsyncStorage.setItem("token", JSON.stringify(userID));
  };

  const onSignUpPressed = () => {
    console.log("Sign In Was Pressed");
    navigation.navigate("SignUp");
  };

  const logInApi = async () => {
    try {
      const response = await tellMeWhereApi.get("/users/usernames", {
        params: { username: `${username}` },
      });
      const usernameResponse = response.data["user"]["username"];
      const userIDResponse = response.data["user"]["id"];
      setUsername(usernameResponse);
      setUserID(userIDResponse);
    } catch (err) {
      console.log(`${err}`);
      if (userID === null) {
        setErrorMessage(`User ${username} does not exist `);
      } else {
        setErrorMessage(`Error: ${err}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>tell me where</Text>
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
      <CustomButton
        text="Don't Have An Account? Sign Up"
        onPress={onSignUpPressed}
        type="TERTIARY"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e5e5e5",
    alignItems: "center",
    justifyContent: "center",
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  titleStyle: {
    fontSize: 55,
    fontFamily: "DancingScript",
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
