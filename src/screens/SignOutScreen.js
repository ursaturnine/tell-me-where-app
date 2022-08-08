import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

export const SignOutScreen = ({ navigation }) => {
  const { setUsername } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);

  const logOut = () => {
    setUsername("");
    setUserID(null);
    AsyncStorage.clear();
  };

  useEffect(() => {
    logOut();
  }, []);
  return null;
};
