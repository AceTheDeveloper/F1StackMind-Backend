import MemberModel from "../models/MemberModel.js";
import UserModel from "../models/UserModel.js";

class AuthService {
  async login(email) {
    try {
      const user = await UserModel.findOne({include : {model : MemberModel, as : 'member'}},{ where: { email } });
      return user;
    } catch (error) {
      console.error("Model Err:", error);
      throw error;
    }
  }
}

export default new AuthService();
