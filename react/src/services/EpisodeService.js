import Service from "./Service";

export default class EpisodeService extends Service {

  constructor(){
    super('episodes'); 
  }

  
  async getEpisodes(id){
    return this.api.get(`/episodes/${id}`);
  }
  
  async getByName(id) {
    return this.api.get(`/name/${id}`);
    
  }

  async getAll() {
    return this.api.get();

  }

  async add(userData) {
    const response = await this.api.post('', userData);
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
