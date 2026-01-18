import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import MemberModel from "./MemberModel.js";


const NoticeModel = sequelize.define('notice', {
id : {
    type : DataTypes.INTEGER,
    autoIncrement : true,
    primaryKey : true,
},

posted_by : {
    type : DataTypes.INTEGER,
    allowNull : false,
    references : {
        model : 'members',
        key : 'id'
    }
},

title : {
    type : DataTypes.TEXT,
    allowNull : false
},

description : {
    type : DataTypes.TEXT,
    allowNull : true
},

category :{
    type : DataTypes.ENUM('system', 'update', 'general'),
    defaultValue : 'general',
    allowNull : false
},

urgent : {
    type : DataTypes.ENUM('true', 'false'),
    default : 'false',
    allowNull : false
}
});

MemberModel.hasMany(NoticeModel, { foreignKey: 'posted_by', as: 'notices' });
NoticeModel.belongsTo(MemberModel, { foreignKey: 'posted_by', as: 'member' });


export default NoticeModel;