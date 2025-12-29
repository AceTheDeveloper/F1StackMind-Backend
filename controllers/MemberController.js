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

}

export default new MembersController();