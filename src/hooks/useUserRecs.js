import { useState, useEffect } from "react";
import tellmewhere from "../api/tell-me-where-api";
import { Text } from "react-native";

export default () => {
  //get request from backend
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //get request from Tell Me Where
  const searchApi = async () => {
    try {
      const response = await tellmewhere.get("/users");
      //list of dicts (users)
      setUsers(response.data);
    } catch (err) {
      setErrorMessage(`Tell Me Where Backend Api was not called:  ${err}`);
    }
  };
  //grab search results when first rendered
  useEffect(() => {
    searchApi();
  }, []);

  return [errorMessage, users];
};
