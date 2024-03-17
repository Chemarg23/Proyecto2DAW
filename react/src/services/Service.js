import axios from "axios";
import { store } from "../store/store";

export default class Service {
  
  api;

  constructor(endpoint = "") {
    this.api = axios.create({
      baseURL: `http://localhost:8080/${endpoint}`,
    });

    this.api.interceptors.request.use((config) => {
      const token = store.getState().user.token;
      token && (config.headers["Authorization"] = `Bearer ${token}`);
      return config;
    });
  }
}
