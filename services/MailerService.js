import nodemailer from "nodemailer";

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
        html: `
          <div style="background-color:#171717; padding:20px; text-align:center;">
              <div style="text-align:center; margin-bottom:20px;">
                <img src="https://f1stackmind-backend.onrender.com/assets/f1mainpic.png" alt="Logo" width="100" style="display:block; margin:0 auto;" />
                <p style="font-size:25px; margin-bottom:15px;font-weight: bold; text-align: center; color: white; font-family:Arial">Welcome to F1StackMind!</p>
              </div>
            </div>

            <div style="background-color:#0a0a0a; padding:30px; font-family:Arial, sans-serif; color:white; line-height:1.6;">

              <p style="font-size:16px; margin-bottom:15px; text-align: center;">Hi ${name},</p>
              <p style="font-size:16px; margin-bottom:15px; text-align: center;">Congratulations! You have been accepted.</p>
              <p style="font-size:16px; margin-bottom:15px; text-align: center;">
                Your temporary password is: <strong>${password}</strong>
              </p>
              <p style="font-size:16px; margin-bottom:25px; text-align: center;">
                Please log in and change your password immediately.
              </p>

              <p style="font-size:12px; color:#999; margin-top:30px; text-align:center;">
                If you did not apply for this, please ignore this email.
              </p>
            </div>
        `, 
      });
    } catch (error) {
      console.error("MailerService error:", error);
      throw error;
    }
  }
}

export default new MailerService();
