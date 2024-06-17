import Service from "./Service";

export default class EpisodeService extends Service {

  constructor(){
    super('episodes'); 
  }

  
  async getEpisodes(id){
    return this.api.get(`/${id}`);
  }
  
  async getByName(id) {
    return this.api.get(`/name/${id}`);
    
  }

  async getAll() {
    return this.api.get();
  }

  async add(data, serieId) {
    const formData = new FormData()
    formData.append("fullname", data.name.replace(/ /g,"_"))
    formData.append("name", data.name)
    formData.append("video", data.video)
    formData.append("img", data.img ? data.img : null)
    formData.append("episode_number", data.episode_number)
    formData.append("serieId", serieId)
    const response = await this.api.post(``, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    return response.data
  }

  async update(id,data ) {
    const formData = new FormData()
    formData.append("fullname", data.name.replace(/ /g,"_"))
    formData.append("name", data.name)
    formData.append("video", data.video ? data.video : null)
    formData.append("img", data.img ? data.img : null)
    formData.append("episode_number", data.episode_number)
    const response = await this.api.put(`/${id}`, formData);
    return response.data;
  }

  async delete(id) {
   return this.api.delete(`/${id}`);
  }

  async getRecommendedEpisodes(id) {
    return this.api.get(`/recommended/${id}`);
  }
}
