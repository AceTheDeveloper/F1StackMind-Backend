import { DataTypes } from "sequelize";
import sequelize from '../config/db.js'

const EventModel = sequelize.define('events', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },

    title : {
        type : DataTypes.STRING,
        allowNull : false
    },

    description : {
        type : DataTypes.TEXT,
        allowNull : true
    },

    status : {
        type : DataTypes.ENUM('up coming', 'on going', 'completed', 'cancelled'),
        defaultValue : 'up coming'
    },

    start_date : {
        type : DataTypes.DATEONLY,
        allowNull : true
    },

    end_date : {
        type : DataTypes.DATEONLY,
        allowNull : false
    },

    start_time : {
        type : DataTypes.TIME,
        allowNull : false
    },

    end_time : {
        type : DataTypes.TIME,
        allowNull : false
    },

    location : {
        type : DataTypes.STRING,
        allowNull : false
    },

    banner_image_url : {
        type : DataTypes.STRING,
        allowNull : true
    },
},{
    timestamps : true
});

export default EventModel;