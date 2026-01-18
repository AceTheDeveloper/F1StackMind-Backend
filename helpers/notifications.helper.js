import axios from "axios";
import { Op } from "sequelize";
import UserModel from "../models/UserModel.js";

export async function sendNotificationToUsers({ title, body, urgent, id }) {
  try {
    // Get all users except the creator and who have push tokens
    const users = await UserModel.findAll({
      where: { 
        push_token: { [Op.ne]: null },
        id: { [Op.ne]: id },
      },
    });

    if (!users.length) return; // nothing to send

    // Prepare messages for batch sending
    const messages = users.map(user => ({
      to: user.push_token,
      title,
      body,
      sound: "default",     
      badge: 1,             
      data: { urgent },    
    }));

    await axios.post("https://exp.host/--/api/v2/push/send", messages, {
      headers: { "Content-Type": "application/json" },
    });

    console.log(`Sent notifications to ${users.length} users`);

  } catch (error) {
    console.error("Failed to send notifications:", error.message);
  }
}
