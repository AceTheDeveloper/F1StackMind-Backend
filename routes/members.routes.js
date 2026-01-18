import express from 'express'
import authenticateToken from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import MemberController from "../controllers/MemberController.js";


const router = express.Router();

router.get('/members/show', authenticateToken, authorizeRoles('admin'), MemberController.showMembers);
router.get('/members/show/:id', authenticateToken, authorizeRoles('admin'), MemberController.showSpecificMember);

export default router;