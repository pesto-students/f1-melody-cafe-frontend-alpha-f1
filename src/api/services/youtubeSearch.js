import axios from "axios";
import { getApiKey } from "./getApiKey";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    videoCategoryId: "10",
    type: "video",
    key: getApiKey(),
  },
});
