import ProfileModel from '../models/ProfileModel.js'


class ProfileService {
    async createUser({uid, student_id, year_level, name}){
        try {
            const newProfile = ProfileModel.create({
            uid,
            student_id,
            year_level,
            full_name : name,
        });

        return newProfile
        } catch (error) {
            console.log("ProfileService Error:", error);
            throw error
            
        }

        
    }
}

export default new ProfileService;