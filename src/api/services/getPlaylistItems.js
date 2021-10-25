import axios from "axios";
import { getApiKey } from "./getApiKey";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    part: "snippet",
    maxResults: "50",
    key: getApiKey(),
  },
});

//let url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${id}&key=${api}`;
