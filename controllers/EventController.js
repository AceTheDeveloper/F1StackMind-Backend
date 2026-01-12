import { saveToCloudinary } from "../helpers/cloudinary.helper.js";
import EventModel from "../models/EventModel.js";


class EventController {
    async show(req, res){
        try {
            const events = await EventModel.findAll();
            res.status(200).json(events);
        } catch (error) {
            console.log(error);
        }
    }

    async create(req, res){
        try{
            let banner_image_url = null;

            banner_image_url = await saveToCloudinary(req.file.path, 'event_banners_images');
            const {title, description, start_date, end_date, start_time, end_time, location} = req.body;

            const result = await EventModel.create({
                banner_image_url,
                description,
                end_date,
                end_time,
                location,
                start_date,
                start_time,
                title
            });

            if(result){
                res.status(200).json({message : "Success", success : true});
            } else {
                res.status(500).json({message : "Something went Wrong", success : false});
            }
        
                        
            
        } catch(e){
            res.status(500).json({message : e, success : false});
            throw e;
        }
    }
}


export default new EventController();