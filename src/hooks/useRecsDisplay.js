import { useState, useContext, useEffect } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

export default () => {
  // const [location, setLocation] = useState("");
  // const [search, setSearch] = useState("");
  const [recs, setRecs] = useState([]);
  const { userID } = useContext(AuthContext);
  const getUserRecs = async () => {
    try {
      const response = await tellMeWhereApi.get(`/users/${userID}`);
      setRecs(response.data.user.recs);
      // setRecs(response.data);
    } catch (err) {
      console.log(`${err}`);
    }
  };
  // console.log(recs);
  useEffect(() => {
    getUserRecs();
  }, []);
  return [recs, setRecs, getUserRecs];
};
