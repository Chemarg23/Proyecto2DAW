import Service from "./Service";

export default class WishListService extends Service {

  constructor(){
    super('wishlist'); 
  }

  async add(userId,serieId) {
    await this.api.post(``,{ userId:userId, serieId:serieId });
  }

  async delete(userId,serieId) {
    await this.api.delete(``,{data: { userId:userId, serieId:serieId }});
  }

  
}
