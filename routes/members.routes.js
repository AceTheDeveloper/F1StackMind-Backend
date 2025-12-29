import express from 'express'
import authenticateToken from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import MemberController from "../controllers/MemberController.js";


const router = express.Router();

router.get('/members/show', authenticateToken, authorizeRoles('admin'), MemberController.showMembers);


export default router;