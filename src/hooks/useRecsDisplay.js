import { useState, useContext, useEffect } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

export default () => {
  const [recs, setRecs] = useState([]);
  const { userID } = useContext(AuthContext);
  const getUserRecs = async () => {
    try {
      const response = await tellMeWhereApi.get(`/users/${userID}`);
      setRecs(response.data.user.recs);
    } catch (err) {
      console.log(`${err}`);
    }
  };
  useEffect(() => {
    getUserRecs();
    console.log("userecsdisplay useEffect ran!");
  }, []);
  return [recs, getUserRecs, setRecs];
};
