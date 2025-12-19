import ApplicantService from "../services/ApplicantService.js";
import MailerService from "../services/MailerService.js";
import UserService from '../services/UserServices.js'
import bcrypt from 'bcrypt'

class ApplicantController {
  async showApplicants(req, res) {
    try {
      const applicants = await ApplicantService.showApplicants();
      return res.status(200).json(applicants);
    } catch (error) {
      console.error("Controller error:", error);
      return res.status(500).json({
        message: "Failed to fetch applicants",
      });
    }
  }


  async showDetails(req, res) {
    const {id} = req.params
    try {
        const applicant = await ApplicantService.showDetails(id)
        return res.status(200).json(applicant);
    } catch (error) {
        console.error("Controller Err :", err);
        return res.status(500).json({
            message : "Failed to fetch applicant"
        })
    }
  }

  async acceptApplicant(req, res){
      const {id} = req.body;

      try{
        const applicant = await ApplicantService.showDetails(id);

        if(!applicant){
          return res.status(401).json({message : "Invalid Details"});
        }

        const {name, email, student_id} = applicant;

        const hashedPassword = await bcrypt.hash(student_id, 16);
        
        const createdUser = await UserService.create(email, hashedPassword);

       if(createdUser){
        await MailerService.sendAcceptedEmail(email, name, student_id);

        // This is temporary
        return res.status(200).json({success: true, message: "Applicant Accepted"});
      }
        
        // Create a user here;
        
      } catch(e){
        console.log(e);
        throw e;
        
      }

  }
}

export default new ApplicantController();
