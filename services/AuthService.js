import UserModel from "../models/UserModel.js";

class AuthService {
  async login(email) {
    try {
      const user = await UserModel.findOne({ where: { email } });
      return user;
    } catch (error) {
      console.error("Model Err:", error);
      throw error;
    }
  }
}

export default new AuthService();
