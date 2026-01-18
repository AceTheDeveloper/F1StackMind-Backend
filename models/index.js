// models/index.js
import UserModel from "./UserModel.js";
import MemberModel from "./MemberModel.js";

UserModel.hasOne(MemberModel, {
  foreignKey: "user_id",
  as: "member",
});

MemberModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

export { UserModel, MemberModel };
