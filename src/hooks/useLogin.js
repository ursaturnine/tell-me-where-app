import { useContext } from "react";
import tellMeWhereApi from "../api/tell-me-where-api";
import { AuthContext } from "../context/AuthContext";

export default () => {
  const { username } = useContext(AuthContext);
  const { setUsername } = useContext(AuthContext);
  const { userID } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);

  const logInApi = async () => {
    try {
      const response = await tellMeWhereApi.post("/users/usernames", {
        username,
      });
      const usernameResponse = response.data["user"]["username"];
      const userIDResponse = response.data["user"]["id"];
      setUsername(usernameResponse);
      setUserID(userIDResponse);
    } catch (err) {
      console.log(err);
    }
  };
  return [username, setUsername, logInApi];
};
