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
}


export default new EventController();