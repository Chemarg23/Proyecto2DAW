import Service from "./Service";

export default class SerieService extends Service {
  constructor() {
    super("series");
  }

  async get(id) {
    return this.api.get(`/${id}`);
  }


  async getAll(page) {
    return this.api.get(`/all/${page}`);
  }

  async add(data) {
    const catId = [];
    data.categories.forEach(element => catId.push(element.id));
    const formData = new FormData();
    formData.append("imgPath", data.imgPath);
    formData.append("descr", data.descr);
    formData.append("categories", catId);
    formData.append("name", data.name);
    formData.append("search", data.name.replace(/ /g,"-"))
    const response = await this.api.post("", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async getByName(name) {
    return this.api.get(`name/${name}`);
  }

  async searchByName(name, page) {
    return this.api.get(`search/${name}/${page}`);
  }

  async searchByCategory(name, page) {
    return this.api.get(`category/${name}/${page}`);
  }

  async delete(id) {
    await this.api.delete(`/${id}`);
  }
}
