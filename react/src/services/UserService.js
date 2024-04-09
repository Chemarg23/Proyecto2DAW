import Service from "./Service";

export default class UserService extends Service {
  constructor() {
    super("users");
  }

  async getUser(id) {
    const response = await this.api.get(`/${id}`);
    return response.data;
  }

  async getAllUsers() {
    const response = await this.api.get();
    return response.data;
  }

  async add(userData) {
    const response = await this.api.post("", userData);
    return response.data;
  }

  async update(id, userData) {
    const response = await this.api.put(`/${id}`, userData);
    return response.data;
  }

  async delete(id) {
    await this.api.delete(`/${id}`);
  }
}
