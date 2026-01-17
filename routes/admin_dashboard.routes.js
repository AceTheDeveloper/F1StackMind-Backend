import express from 'express'
import AdminDashboardController from '../controllers/AdminDashboardController.js';
import authenticateToken from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import validate_api_key from '../middlewares/api_key.middleware.js';


const router = express.Router();

router.get('/dashboard/summary', validate_api_key, authenticateToken, authorizeRoles('admin'), AdminDashboardController.stats);
router.get('/dashboard/get_events', validate_api_key, authenticateToken, authorizeRoles('admin'), AdminDashboardController.get_events);
router.get('/dashboard/get_members', validate_api_key, authenticateToken, authorizeRoles('admin'), AdminDashboardController.get_members);
// router.get()

export default router;