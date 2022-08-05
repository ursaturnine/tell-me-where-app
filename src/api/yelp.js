import axios from "axios";

export default axios.create({
  baseURL: "http://api.yelp.com/v3/businesses",
  headers: {
    // Authorization: `Bearer ${process.env.REACT_APP_YELP_API_KEY}`,
    Authorization:
      "Bearer qsTCQpxZ8yqYQlROSH0znIBCGfGLumGDd2Ct3XfCZigpMPVT-LpqOySQjacoiFAfVxEd08S-V7BFJd5AYrQ8Kex-6BmXlMjpHz75iJDwMfOEBPBbEs8mFZJzMKPhYnYx",
  },
});
