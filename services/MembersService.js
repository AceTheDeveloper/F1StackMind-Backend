import { Op } from "sequelize";
import ApplicantModel from "../models/ApplicantModel.js";
import MemberModel from "../models/MemberModel.js";

class MembersService {
    async showMembers() {
       try {
         const members = await MemberModel.findAll({order : [['name', 'ASC']]});
            return members
       } catch (error) {
            console.log("MemberService Error :", error);
            throw error;
       }
    }

    async createMember(user_id, name, year_level, student_id, interests){
        try {
            const createdMember = await MemberModel.create({
                user_id : user_id,
                name : name,
                year_level : year_level,
                student_id : student_id,
                interests : interests
            });

            return createdMember;
        } catch (error) {
            console.log("Member Controller Error", error);
            throw error;
        }
    }
}

export default new MembersService();
