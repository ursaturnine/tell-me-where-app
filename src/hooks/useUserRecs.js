import { useState, useEffect } from "react";
import tellmewhere from "../api/tell-me-where-api";

export default () => {
  //get request from backend
  const [recs, setRecs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  //get request from Tell Me Where
  const searchApi = async () => {
    try {
      const response = await tellmewhere.get("/users");
      //list of dicts (users)
      setRecs(response.data);
      console.log(response.data);
    } catch (err) {
      setErrorMessage(`Tell Me Where Backend Api was not called:  ${err}`);
    }
  };

  //grab search results when first rendered
  useEffect(() => {
    searchApi();
  }, []);

  return [errorMessage, recs];
};
