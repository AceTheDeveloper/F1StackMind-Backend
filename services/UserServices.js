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
}

export default new UserService();