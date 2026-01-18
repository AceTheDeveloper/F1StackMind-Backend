import MemberModel from "../models/MemberModel.js";
import UserModel from "../models/UserModel.js";
import MembersService from "../services/MembersService.js";

class MembersController {
    async showMembers(req, res){
        try {
            const members = await MembersService.showMembers();
            
            res.status(200).json(members)
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    // Specific function for showing member's profile

    async showSpecificMember(req, res){
        try{
            const {id} = req.params;

            const member = await MemberModel.findOne({where : {id}, include : {
                model : UserModel,
                as : 'user'
            }});
            
            if(member){
                return res.json(member);
            } else{
                return res.status(500).json({message : "Internal Server Error", status : "failure"});
            }
        } catch(e) {
            console.log(e);
            
        }
    }

}

export default new MembersController();