import express from 'express';
import authenticateToken from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import validate_api_key from '../middlewares/api_key.middleware.js';
import EventController from '../controllers/EventController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest : 'upload/'})

router.get('/events/show', authenticateToken, authorizeRoles('admin', 'user'), EventController.show)
router.post('/events/create', authenticateToken, authorizeRoles('admin'), upload.single('image'), EventController.create);
router.post('/events/update/:id', EventController.update);
router.post('/events/delete/:id', EventController.delete);

export default router;