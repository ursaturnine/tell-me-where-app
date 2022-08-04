import { useState, useContext } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";
import useRecsDisplay from "./useRecsDisplay";

export default () => {
  const [location, setLocation] = useState("");
  const [search, setSearch] = useState("");
  const [getUserRecs, setRecs, useEffect] = useRecsDisplay();
  const { userID } = useContext(AuthContext);
  const addRecApi = async () => {
    try {
      const response = await tellMeWhereApi.post(`/users/${userID}/recs`, {
        location,
        search,
      });
    } catch (err) {
      console.log(`${err}`);
    }
  };
  return [location, setLocation, search, setSearch, addRecApi];
};
