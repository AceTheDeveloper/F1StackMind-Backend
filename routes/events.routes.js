import express from 'express';
import authenticateToken from '../middlewares/auth.middleware';
import { authorizeRoles } from '../middlewares/role.middleware';
import EventController from '../controllers/EventController.js';

const router = express.Router();

router.get('/events/show', authenticateToken, authorizeRoles('admin'), EventController.show)

export default router;