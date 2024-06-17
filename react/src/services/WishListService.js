import axios from "axios";
import { store } from "../store/store";

const baseUrl = "http://localhost:8080/api/";

class Service {
  api;

  constructor(endpoint = "") {
    this.api = axios.create({
      baseURL: `${baseUrl}${endpoint}`,
    });

    this.api.interceptors.request.use((config) => {
      const token = store.getState().user.token;
      token && (config.headers["Authentication"] = `Bearer ${token}`);
      config.headers["Access-Control-Allow-Origin"] = "*";
      return config;
    });
  }
}

export default class WishListService extends Service {
  constructor() {
    super("wishlist");
  }

  async add(userId, serieId) {
    await this.api.post(``, { userId: userId, serieId: serieId });
  }

  async delete(userId, serieId) {
    await this.api.delete(``, { data: { userId: userId, serieId: serieId } });
  }
}
