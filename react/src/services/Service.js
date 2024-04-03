import axios from "axios";
import { store } from "../store/store";

export const baseUrl = 'http://localhost:8080/api/'

export default class Service {
  
  api;

  constructor(endpoint = "") {
    this.api = axios.create({
      baseURL: `${baseUrl}${endpoint}`,
    });

    this.api.interceptors.request.use((config) => {
      const token = store.getState().user.token;
      token && (config.headers["Authorization"] = `Bearer ${token}`);
      return config;
    });
  }
}
