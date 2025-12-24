import ApplicantModel from "./ApplicantModel.js";
import UserModel from "./UserModel.js";

ApplicantModel.belongsTo(UserModel, {
    foreignKey : 'user_id',
    as : 'user'
});

UserModel.hasOne(ApplicantModel, {
    foreignKey : 'user_id',
    as : 'applicant'
});