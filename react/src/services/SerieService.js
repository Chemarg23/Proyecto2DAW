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
    const search = data.name.trim().replace(/\s/g, "-");
    const catId = [];
    data.categories.forEach((element) => catId.push(element.id));
    const formData = new FormData();
    formData.append("img", data.img);
    formData.append("descr", data.descr);
    formData.append("categories", catId);
    formData.append("name", data.name.trim());
    formData.append("search", search);

    const response = await this.api.post("", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data;
  }

  async update(data, id) {
    const search = data.name.trim().replace(/\s/g, "-");
    const catId = [];
    data.categories.forEach((element) =>
      catId.push(element.id ? element.id : element.value)
    );
    const formData = new FormData();
    !data.img !== ""
      ? formData.append("img", data.img)
      : formData.append("img", null);
    formData.append("descr", data.descr.trim());
    formData.append("categories", catId);
    formData.append("name", data.name.trim());
    formData.append("search", search.trim());
    const response = await this.api.put(`/${id}`, formData, {
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
