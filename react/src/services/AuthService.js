import Service from "./Service";

export default class AuthService extends Service {

  constructor(){
    super(); 
  }

  async login(credentials) {
    return this.api.post(`/auth/login`, credentials)
  }

  async register(data) {
    return this.api.post('/auth/register',data);
  }



  async logout(){

  }
  
}
