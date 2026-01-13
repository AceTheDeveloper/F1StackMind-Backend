import UserModel from '../models/UserModel.js';
import ApplicantService from '../services/ApplicantService.js';

class JoinController {
  async join(req, res) {
    try {
      const { name, email, course, yearLevel, studentId, interests, message } = req.body;

      // Basic validation
      if (!email || !email.toLowerCase().endsWith('@phinmaed.com')) {
        return res.status(400).json({ success: false, message: "Invalid email domain" });
      }
      if (!name || !course || !studentId || !Array.isArray(interests) || interests.length === 0) {
        return res.status(400).json({ success: false, message: "All fields are required" });
      }

      // Check existing users
      const existingUser = await ApplicantService.check({ email });
      const existingMember = await UserModel.findOne({ where: { email } });

      if (existingUser || existingMember) {
        return res.status(400).json({ success: false, message: "You are already registered" });
      }

      // Insert into DB
      let id;
      try {
        id = await ApplicantService.create({
          name,
          email,
          course,
          year_level: yearLevel,
          studentId,
          interests: JSON.stringify(interests), // ensure proper DB format
          message,
        });
      } catch (dbErr) {
        console.error("DB Insert Error:", dbErr);
        return res.status(500).json({ success: false, message: "Database insertion failed", error: dbErr.message });
      }

      return res.status(201).json({
        success: true,
        id,
        message: "Joined successfully",
      });

    } catch (err) {
      console.error("Controller Error:", err);
      return res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
  }
}

export default new JoinController();
