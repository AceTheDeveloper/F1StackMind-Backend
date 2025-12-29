import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const MemberModel = sequelize.define('members', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },

    user_id : {
        type : DataTypes.INTEGER,
        references: {
            model : 'users',
            key : 'id'
        }
    },

    name : {
    type : DataTypes.STRING,
    allowNull : false
    },

    year_level : {
        type : DataTypes.STRING,
        allowNull : false
    }, 

    student_id : {
        type : DataTypes.STRING,
        unique : true,
        allowNull : true
    },

    interests : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    
    contact_number  : {
        type : DataTypes.INTEGER,
        allowNull : true
    },

    dob : {
        type : DataTypes.DATE,
        allowNull : true,
    },

    address : {
        type : DataTypes.TEXT,
        allowNull : true
    }
});


export default MemberModel;