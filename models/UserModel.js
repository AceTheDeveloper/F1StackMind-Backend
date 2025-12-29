import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import MemberModel from "./MemberModel.js";


const UserModel = sequelize.define('Users', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    email : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false
    },

    role: {
        type: DataTypes.ENUM('member', 'admin'),
        allowNull: false,
        defaultValue: 'member'
        }

}, {
    tableName : 'users',
    timestamps : true
});

UserModel.hasOne(MemberModel, {foreignKey : 'user_id', as : 'member'})
MemberModel.belongsTo(UserModel, {foreignKey : 'user_id', as : 'user'})

export default UserModel;