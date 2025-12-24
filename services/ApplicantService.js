import ApplicantModel from "../models/ApplicantModel.js";

class ApplicantService {
  // Create a new applicant
  async create({ name, email, course, year_level, student_id, interests, message }) {
    try {
      const interestString = Array.isArray(interests) ? interests.join(', ') : interests;

      const applicant = await ApplicantModel.create({
        name,
        email,
        course,
        year_level,
        student_id,
        interests: interestString,
        message
      });

      return applicant.id;
    } catch (e) {
      console.error("Error creating applicant:", e);
    }
  }

  async check({ email }) {
    try {
      const applicant = await ApplicantModel.findOne({ where: { email } });
      return applicant;
    } catch (e) {
      console.error("Error checking applicant:", e);
    }
  }


  // ON THIS LINE ONWARDS WE WILL IS A PART OF AN ADMIN TO CONTROLL THE APPLICANTS

  async showApplicants() {
    try {
      const applicants = await ApplicantModel.findAll({
        order: [['createdAt', 'DESC']],
        where: { user_id: null }
      });

      return applicants;
    } catch (error) {
      console.error("Model error:", error);
      throw error;
    }
  }

  async showDetails(id){
    try{
      const applicant = ApplicantModel.findOne({where : {id}})
      return applicant
    } catch (err) {
      console.error("Model Err:", err);
      throw err;
    }
  }

  async deleteApplicant(id){
    try{
      const applicant = ApplicantModel.destroy({
        where : {id}
      })
    } catch (e){
        console.log("Applicant Service err :", e);
        throw e;
    }
  }
}

export default new ApplicantService();
