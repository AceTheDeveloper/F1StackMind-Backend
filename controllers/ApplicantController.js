import ApplicantService from "../services/ApplicantService.js";
import MailerService from "../services/MailerService.js";
import UserService from '../services/UserServices.js'
import { generateUid } from '../helpers/uid.helper.js'
import bcrypt from 'bcrypt'
import ApplicantModel from "../models/ApplicantModel.js";
import MembersService from "../services/MembersService.js";

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

        const {name, email, student_id, year_level, interests} = applicant;

        const hashedPassword = await bcrypt.hash(student_id, 12);

        const createdUser = await UserService.create(email, hashedPassword);

        const createdMember = await MembersService.createMember(createdUser.id, name, year_level, student_id, interests);        

      if(createdMember){
        await MailerService.sendAcceptedEmail(email, name, student_id);
        ApplicantModel.destroy({where : {id}})
        return res.status(200).json({success: true, message: "Applicant Accepted"});
      }

        
        
      } catch(e){
        console.log(e);
        throw e;
        
      }

  }
}

export default new ApplicantController();
