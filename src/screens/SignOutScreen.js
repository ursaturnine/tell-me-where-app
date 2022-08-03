import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavigationContainer } from "@react-navigation/native";

export const SignOutScreen = () => {
  const { username } = useContext(AuthContext);
  const { setUsername } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);

  setUsername("");
  setUserID(null);
  navigation.navigate("Sign In");
};
