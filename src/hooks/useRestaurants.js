import React, { useState, useEffect } from "react";
import yelp from "../api/yelp";

export default () => {
  const [restaurants, setRestaurants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  //get request from Yelp
  const searchApi = async () => {
    try {
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          location: "Seattle",
        },
      });
      setRestaurants(response.data.businesses);
    } catch (err) {
      setErrorMessage(`The yelp Api was not called:  ${err}`);
    }
  };

  //grab search results when first rendered
  useEffect(() => {
    searchApi();
  }, []);

  return [errorMessage, restaurants];
};
