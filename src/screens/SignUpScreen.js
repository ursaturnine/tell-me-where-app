import React, { useState } from "react";
import { Text, StyleSheet, View, ActivityIndicator } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import tellMeWhereApi from "../api/tell-me-where-api";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const registerApi = async () => {
    try {
      const response = await tellMeWhereApi.post("/users", {
        username,
      });
      console.log(response.data);
      navigation.navigate("SignIn");
    } catch (err) {
      console.log(`${err}`);
    }
  };

  const onRegisterPressed = async () => {
    setIsLoading(true);
    if (username != "") {
      let userFound = false;
      const response = await tellMeWhereApi.get("/users");
      response.data.map((resp) => {
        let user = resp["username"];
        if (user === username) {
          userFound = true;
        }
      });
      if (userFound === false) {
        console.log("user doesn't exist yet");
        registerApi();
      } else {
        console.log("Username is taken");
        setErrorMessage("Username is taken");
      }
    }
    setIsLoading(false);
  };

  const onTermsOfUsePressed = () => {
    console.log("Terms of Use Was Pressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.log("Privacy Policy Was Pressed");
  };

  const onSignInPressed = () => {
    navigation.navigate("SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>tell me where</Text>
      <ActivityIndicator color="orange" animating={isLoading} size="small" />
      <Text style={styles.textStyle}>Create An Account</Text>
      <InputForm
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <Text>{errorMessage ? errorMessage : ""}</Text>
      <CustomButton
        text="Register"
        onPress={onRegisterPressed}
        type="PRIMARY"
      />
      <CustomButton
        text="Have An Account? Sign In"
        onPress={onSignInPressed}
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
  },
  link: {
    color: "#FF4848",
  },
  titleStyle: {
    fontSize: 55,
    fontFamily: "DancingScript",
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 50,
  },
});

export default SignUpScreen;
