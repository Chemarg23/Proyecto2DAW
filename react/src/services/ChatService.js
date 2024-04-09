import Service from "./Service";

export default class ChatService extends Service {
  constructor() {
    super("chat");
  }

  
  async getOne(id) {
    return this.api.get(`/message/${id}`);
  }  

  async get(room, page) {
    return this.api.get(`/${room}/${page}`);
  }

  async saveImg( img) {
    const formData = new FormData();
    formData.append("img", img);
    return this.api.post(``, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
  }
}
