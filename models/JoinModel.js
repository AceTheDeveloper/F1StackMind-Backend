import db from "../config/db.js";
import ApplicantModel from '../models/ApplicantModel.js'

class JoinModel {
  async create({ name, email, course, yearLevel, studentId, interests, message }) {
    const interestString = interests.join(', ')
    try{
    const [result] = await db.execute(
      "INSERT INTO applicants (name, email, course, year_level, student_id, interests, message) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, email, course, yearLevel, studentId, interestString, message]
    );

    return result.insertId;

    }catch(e){
        console.log(e)
    }
  }

  async check({ email }) {
  try {
    const [rows] = await db.execute(
      "SELECT * FROM applicants WHERE email = ?",
      [email]
    );
    return rows
  } catch (e) {
   console.error(e)
  }
}

}

export default new JoinModel();
