import MemberModel from '../models/MemberModel.js';
import UserModel from '../models/UserModel.js'

class UserService {
    async create(email, password){
        try{
            const createUser = UserModel.create({email, password});
            return createUser;
        } catch (e){
            console.log(e);
            throw e;
        }
    }

    async show(id) {
        try {
            const user = await UserModel.findOne({
                where : {id},
                include : [
                    {
                        model : MemberModel,
                        as : 'member'
                    },
                ],
            });

            return user;
        } catch (error) {
            console.log("User Service Error", error);
            throw e;
        }
    }
}

export default new UserService();