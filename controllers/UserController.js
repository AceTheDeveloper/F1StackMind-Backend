import UserServices from "../services/UserServices.js";
import cloudinary from "../config/cloudinary.js";
import UserModel from "../models/UserModel.js";
import MemberModel from "../models/MemberModel.js";
import fs from 'fs'

class UserController {
    async show (req, res) {
        const {id} = req.params;

        try {
            const user = await UserServices.show(id);
            res.status(200).json(user);
        } catch (error) {
            console.log("User Controller:", error);
            throw error;
        }
    }

    async update(req, res) {
            try {
                const { name, email, year_level, student_id, interests, contact_number, dob, address } = req.body;
                const id = req.params.id;

                let image_url = null;

                if (req.file) {
                const result = await cloudinary.uploader.upload(req.file.path, {
                    folder: "profile_images", 
                    use_filename: true,
                    unique_filename: false,
                });
                image_url = result.secure_url;

                fs.unlinkSync(req.file.path)
                }

                // Update UserModel
                await UserModel.update(
                { email },
                { where: { id } }
                );

                // Update MemberModel
                await MemberModel.update(
                { name, year_level, student_id, interests, contact_number, dob, address, image_url },
                { where: { user_id: id } }
                );

                res.status(200).json({ success: true, message: "Updated", image: image_url });
            } catch (error) {
                console.log("Update error:", error);
                res.status(500).json({ success: false, message: "Server error" });
            }
            }

}

export default new UserController();