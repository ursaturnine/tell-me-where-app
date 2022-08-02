import axios from "axios";

export default axios.create({
  baseURL: "https://tell-me-where-backend.herokuapp.com",
});
