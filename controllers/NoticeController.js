import MemberModel from "../models/MemberModel.js";
import NoticeModel from "../models/NoticeModel.js";

class NoticeController {
    async show(req, res){
        try{
            const notices = await NoticeModel.findAll({order : [['createdAt', 'DESC']],
                include : {
                    model : MemberModel,
                    as : 'member'
                }
            });

            console.log(notices);
            return res.status(200).json(notices);
        } catch(e){
            console.log(e);
        }
    }

    async create(req, res){

        try{
            const {title, posted_by, description, category, urgent} = req.body;
            const created = await NoticeModel.create({
                title,
                posted_by,
                description,
                category,
                urgent
            });

            if(created) return res.status(201).json({message : "Notice Created Succesfully", status : "success"});

            res.status(500).json({message : "An Error Occured", status : "failure"});
        } catch(e){
            console.log(e);
        }
        
    }

    async delete(req, res){
        try {
            const {id} = req.params;
            const delete_query = await NoticeModel.destroy({where : {id}});

            if(delete_query) return res.status(200).json({message : "Deleted Successfully", status : "success"});

            res.status(500).json({message : "Internal Server Error", status : "failure"});
        } catch (error) {
            console.log(error);
            
        }
    }
}

export default new NoticeController();