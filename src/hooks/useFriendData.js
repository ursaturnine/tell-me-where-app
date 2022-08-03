import { useState, useEffect, useContext } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { Text } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default () => {
  //get request from backend
  const [friendData, setFriendData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { userID } = useContext(AuthContext);
  //get request from Tell Me Where
  const getFriendsApi = async () => {
    try {
      const response = await tellMeWhereApi.get(`/users/${userID}`);
      const friendDataResponse = response.data["user"]["friends"];
      setFriendData(friendDataResponse);
    } catch (err) {
      setErrorMessage(`Tell Me Where Backend Api was not called:  ${err}`);
    }
  };
  // const searchApi = async () => {
  //   try {
  //     const response = await tellmewhere.get("/users");
  //     //list of dicts (users)
  //     setUsers(response.data);
  //   } catch (err) {
  //     setErrorMessage(`Tell Me Where Backend Api was not called:  ${err}`);
  //   }
  // };
  //grab search results when first rendered
  useEffect(() => {
    getFriendsApi();
  }, []);

  return [errorMessage, friendData, setFriendData];
};
