import UserModel from "../models/UserModel.js";

class NotificationController {
   async create(req, res) {
  try {
    const { id, push_token } = req.body;

    const [updatedRows] = await UserModel.update(
      { push_token },
      { where: { id } }
    );

    if (updatedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Push token updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
}

}

export default new NotificationController();