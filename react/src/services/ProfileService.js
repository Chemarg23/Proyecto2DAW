import Service from "./Service";

export default class ProfileService extends Service {
  constructor() {
    super("profile");
  }

  async update(id, data) {
    return this.api.put(`/${id}`, data, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }

  async changePassword(id, data) {
    return this.api.put(`/password/${id}`, data);
  }

  async discharge(id) {
    return this.api.delete(`/discharge/${id}`);
  }

}
