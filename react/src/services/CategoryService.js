import Service from "./Service";

export default class CategoryService extends Service {
  constructor() {
    super("categories");
  }

  async getAll() {
    return this.api.get();
  }

}
