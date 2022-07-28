import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization:
      "Bearer qsTCQpxZ8yqYQlROSH0znIBCGfGLumGDd2Ct3XfCZigpMPVT-LpqOySQjacoiFAfVxEd08S-V7BFJd5AYrQ8Kex-6BmXlMjpHz75iJDwMfOEBPBbEs8mFZJzMKPhYnYx",
  },
});
