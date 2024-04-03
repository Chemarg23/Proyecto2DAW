import { store } from "../store/store";
import setToken from "../store/userSlice";
import Service from "./Service";

export default class AuthService extends Service {

  constructor(){
    super(); 
  }

  async login(credentials) {
    return this.api.post(`/auth/login`, credentials);
  }

  async register(data) {
    return this.api.post('/auth/register',data);
  }


  async refreshToken() {
    const response = await this.api.post('/auth/refresh-token');
    store.dispatch(setToken(response.data.token));
  }

  async logout(){

  }
  
}
