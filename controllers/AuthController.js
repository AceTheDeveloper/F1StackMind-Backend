import AuthService from "../services/AuthService.js";
import bcrypt from "bcrypt";
import { generateToken } from "../helpers/jwt.helper.js";
class AuthController {
  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    try {
      const user = await AuthService.login(email);       

      if (!user) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({
          message: "Invalid credentials",
        });
      }

      const token = generateToken({id : user.id, email : user.email,role: user.role});

      return res.status(200).json({
        message: "Login successful",
        token,
        user_role:user.role,
        user
      });

    } catch (error) {
      console.error("Controller Err:", error);
      return res.status(500).json({
        message: "Login failed",
      });
    }
  }
}

export default new AuthController();
