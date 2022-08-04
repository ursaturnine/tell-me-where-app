import { useState, useContext } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
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
      const recData = response.data["rec"];
      return recData;
    } catch (err) {
      console.log(`${err}`);
    }
  };
  return [location, setLocation, search, setSearch, addRecApi];
};
