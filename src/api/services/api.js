import { QUALITY } from "../../utils/constants";
import instance from "./axios";

class API {
  async getSongs(type = null, search = null) {
    let params = {};
    if (type === "trending") {
      params["type"] = type;
    } else if (type && search) {
      params["type"] = type;
      params["search"] = search;
    } else {
      params["search"] = search;
    }
    let result = await instance.get("/songsList", { params: params });
    return result;
  }

  async getPlaylistItems(playlistId) {
    let result = await instance.get(`/playlistItem/${playlistId}`);
    return result;
  }

  async getSongUrl(videoId, quality) {
    let params = {};
    if (quality === QUALITY.LOW) {
      params["quality"] = "low";
    } else if (quality === QUALITY.MED) {
      params["quality"] = "medium";
    } else {
      params["quality"] = "high";
    }
    let result = await instance.get(`/song/${videoId}`, { params: params });
    return result;
  }

  async getPaymentGateWay(value) {
    let params = {
      plan: value,
    };
    let result = await instance.get("/payment", { params: params });
    return result;
  }

  async createPlaylist(data) {
    let result = await instance.post("/albums", data);
    return result;
  }

  async updatePlaylist(id, data) {
    let result = await instance.put(`/albums/${id}`, data);
    return result;
  }

  async getPlaylists() {
    let params = {
      limit: 10,
      offset: 1,
    };
    let result = await instance.get(`/albums`, { params: params });
    return result;
  }

  async getPlaylistDetail(albumId) {
    let result = await instance.get(`/albums/${albumId}`);
    return result;
  }
}
export default API;
