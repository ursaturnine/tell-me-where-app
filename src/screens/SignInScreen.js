import React from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import useLogin from "../hooks/useLogin";

const SignInScreen = ({}) => {
  const [username, setUsername, logInApi] = useLogin();

  const onSignInPressed = () => {
    console.log("The Sign In Button Was Pressed");
    logInApi();
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
