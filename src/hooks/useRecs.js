import { useState, useContext } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const { userID } = useContext(AuthContext);
  const addRecApi = async () => {
    try {
      const response = await tellMeWhereApi.post(`/users/${userID}/recs`, {
        location,
        search,
      });
      console.log(response.data);
    } catch (err) {
      console.log(`${err}`);
    }
  };
  return [location, setLocation, search, setSearch, addRecApi];
};
