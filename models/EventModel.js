import { DataTypes } from "sequelize";
import sequelize from '../config/db.js'

const EventModel = sequelize.define('events', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
    },

    description : {
        type : DataTypes.TEXT,
        allowNull : true
    },

    category : {
        type : DataTypes.ENUM('academic', 'bootcamp'),
        defaultValue : 'academic',
        allowNull : false
    },

    status : {
        type : DataTypes.ENUM('up coming', 'on going', 'completed', 'cancelled'),
        defaultValue : 'up coming'
    },

    start_datetime : {
        type : DataTypes.DATE,
        allowNull : true
    },

    end_datatime : {
        type : DataTypes.DATE,
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

    max_attendees : {
        type : DataTypes.INTEGER,
        allowNull : true
    }
},{
    timestamps : true
});

export default EventModel;