import express from 'express';
import authenticateToken from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import EventController from '../controllers/EventController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest : 'upload/'})

router.get('/events/show', authenticateToken, authorizeRoles('admin'), EventController.show)
router.post('/events/create', authenticateToken, authorizeRoles('admin'), upload.single('image'), EventController.create);

export default router;