import JoinModel from "../models/JoinModel.js";

class JoinController {
  async join(req, res) {
  try {
    const { name, email, course, yearLevel, studentId, interests, message } = req.body;

    if (!email.endsWith('@phinmaed.com')) {
      return res.json({ success: false, message: "Invalid email domain" });
    }


    if (!name || !email || !course || !studentId || !Array.isArray(interests) || interests.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await JoinModel.check({ email });
    if(existingUser.length > 0){
      return res.json({success : false, message : "You are already Registered"})
      
    }    
    const id = await JoinModel.create({ name, email, course, yearLevel, studentId, interests, message });
    res.status(201).json({
      success: true,
      id,
      message: "Joined successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
}

export default new JoinController();
