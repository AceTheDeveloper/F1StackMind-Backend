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

    
});

export default ProfileModel