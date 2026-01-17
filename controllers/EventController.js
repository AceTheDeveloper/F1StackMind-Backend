import { saveToCloudinary } from "../helpers/cloudinary.helper.js";
import EventModel from "../models/EventModel.js";


class EventController {
    async show(req, res){
        try {
            const events = await EventModel.findAll({order : [['start_date', 'DESC']]});
            res.status(200).json(events);
        } catch (error) {
            console.log(error);
        }
    }

    async show_event(req, res){
        try {
            const {id} = req.params
            const event = await EventModel.findOne({where : {id}});
            res.status(200).json(event);
        } catch (e){
            res.status(500).json({message : "Failed To Fetch", status : "failure"});
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

    async update(req, res) {
        try {
            const { id } = req.params;
            const {
            title,
            description,
            start_date,
            end_date,
            start_time,
            end_time,
            location
            } = req.body;

            const specific_event = await EventModel.findOne({ where: { id } });

            if (!specific_event) {
            return res.status(404).json({
                message: "No Event Found",
                status: "Failed"
            });
            }

            let banner_image_url = specific_event.banner_image_url;

            if (req.file) {
            banner_image_url = await saveToCloudinary(
                req.file.path,
                'event_banners_images'
            );
            }

            const update = await EventModel.update(
            {
                title,
                description,
                start_date,
                end_date,
                start_time,
                end_time,
                location,
                banner_image_url
            },
            {
                where: { id }
            }
            );

            if (!update) {
            return res.status(500).json({
                message: "Update error",
                status: "Failed"
            });
            }

            return res.status(200).json({
            message: "Event Updated Successfully",
            status: "Success",
            });

        } catch (e) {
            console.error(e);
            return res.status(500).json({
            message: "Internal Server Error",
            status: "Failed"
            });
        }
    }

    async delete (req, res){
        const {id} = req.params;

        const deleteEvent = await EventModel.destroy({where : {id}});

        if(!deleteEvent) return res.status(500).json({message : "Unable to delete", status : "Failure"});
        
        res.status(200).json({message : "Deleted Successfully", status : "success"});
    }

    async update_status(req, res){
        const {id} = req.params;
        const {status} = req.body;
        
        const updated_status = await EventModel.update({status}, {where : {id}})

        if(updated_status){
          return  res.status(200).json({message : "Status Updated Successfully", status : "success"});
        } 

        res.status(500).json({message : "An Error Occured", status : "failure"})
    }

}


export default new EventController();