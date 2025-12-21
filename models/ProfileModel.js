import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ProfileModel = sequelize.define('profiles', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true,
    },

    uid : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : false,
    },

    student_id : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : true
    },

    year_level : {
        type : DataTypes.STRING,
        allowNull : false
    },

    full_name : {
        type : DataTypes.STRING,
        allowNull : false
    },

    contact_number  : {
        type : DataTypes.INTEGER,
        allowNull : true,
        unique : true
    },

    date_of_birth : {
        type : DataTypes.DATE,
        allowNull : true
    }
});

export default ProfileModel