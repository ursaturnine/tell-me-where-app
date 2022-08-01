import React, { useState } from "react";
import { Text, StyleSheet, View, Image } from "react-native";
import InputForm from "../components/InputForm";
import CustomButton from "../components/CustomButton";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const onRegisterPressed = () => {
    console.log("The Register Button Was Pressed");
    navigation.navigate("/SignIn");
  };

  const onTermsOfUsePressed = () => {
    console.log("Terms of Use Was Pressed");
  };

  const onPrivacyPolicyPressed = () => {
    console.log("Privacy Policy Was Pressed");
  };

  const onSignInPressed = () => {
    console.log("Sign In Was Pressed");
    navigation.navigate("/SignIn");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>Create An Account</Text>
      <InputForm
        placeholder="Username"
        value={username}
        setValue={setUsername}
      />
      <InputForm placeholder="Email" value={email} setValue={setEmail} />
      <InputForm
        placeholder="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry
      />
      <InputForm
        placeholder="Re-enter Password"
        value={passwordRepeat}
        setValue={setPasswordRepeat}
        secureTextEntry
      />
      <CustomButton
        text="Register"
        onPress={onRegisterPressed}
        type="PRIMARY"
      />
      <Text>
        By registering, you accept our{" "}
        <Text style={styles.link} onPress={onTermsOfUsePressed}>
          Terms of Use
        </Text>{" "}
        and
        <Text style={styles.link} onPress={onPrivacyPolicyPressed}>
          {" "}
          Privacy Policy
        </Text>
      </Text>
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
  },
  textStyle: {
    fontSize: 30,
    color: "#141414",
    fontWeight: "bold",
    marginTop: 40,
    marginLeft: 15,
  },
  link: {
    color: "#FF4848",
  },
});

export default SignUpScreen;
