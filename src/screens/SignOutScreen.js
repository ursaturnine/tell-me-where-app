import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const SignOutScreen = ({ navigation }) => {
  const { setUsername } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);

  setUsername("");
  setUserID(null);

  return null;
};
