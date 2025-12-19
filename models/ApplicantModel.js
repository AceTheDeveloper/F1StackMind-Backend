import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ApplicantModel = sequelize.define('Applicants', {
  id : {
    type : DataTypes.INTEGER,
    primaryKey : true,
    autoIncrement : true
  },

  name : {
    type : DataTypes.STRING,
    allowNull : false
  },

  email : {
    type : DataTypes.STRING,
    allowNull : false,
    unique : true
  }, 

  course : {
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
  
  message : {
    type : DataTypes.TEXT,
    allowNull : true
  }
}, {
  tableName : 'applicants',
  timestamps : true
});

export default ApplicantModel