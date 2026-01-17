import ApplicantModel from '../models/ApplicantModel.js';
import EventModel from '../models/EventModel.js';
import MemberModel from '../models/MemberModel.js'

class AdminDashboardController {
    async stats(req, res){
        const member_count = await MemberModel.count();
        const event_count = await EventModel.count();
        const applicant_count = await ApplicantModel.count();

        res.status(200).json({member_count, event_count, applicant_count});
        
    }

    async get_events(req, res) {
        try {
            const events = await EventModel.findAll({
                where: { status: 'up coming' },
                order: [['start_date', 'DESC']],
                limit: 5
            });

            return res.json(events);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }

    async get_members(req, res){
        try {
            const members = await MemberModel.findAll({
                order : [['createdAt', 'DESC']],
                limit : 5
            });            
            return res.json(members)
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Something went wrong' });
        }
    }


    
}

export default new AdminDashboardController();