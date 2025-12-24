import nodemailer from "nodemailer";
import { acceptedEmailTemplate } from "../templates/email_templates.js";

class MailerService {
  constructor() {
    // create transporter once
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });
  }

  async sendAcceptedEmail(email, name, password) {
    try {
      await this.transporter.sendMail({
        from: `"Admissions" <${process.env.MAIL_USER}>`,
        to: email,
        subject: "You have been accepted!",
        html: acceptedEmailTemplate(name, password)
      });
    } catch (error) {
      console.error("MailerService error:", error);
      throw error;
    }
  }
}

export default new MailerService();
