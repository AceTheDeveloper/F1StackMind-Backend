import express from 'express';
import authenticateToken from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import validate_api_key from '../middlewares/api_key.middleware.js';
import EventController from '../controllers/EventController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({dest : 'upload/'})

router.get('/events/show', validate_api_key, authenticateToken, authorizeRoles('admin', 'user'), EventController.show)
router.post('/events/create', validate_api_key, authenticateToken, authorizeRoles('admin'), upload.single('image'), EventController.create);
router.get('/events/show/:id', validate_api_key, authenticateToken, authorizeRoles('admin', 'user'), EventController.show_event);
router.post('/events/status_update/:id', validate_api_key, authenticateToken, authorizeRoles('admin'), EventController.update_status);
router.post('/events/update/:id', validate_api_key, authenticateToken, authorizeRoles('admin'), EventController.update);
router.post('/events/delete/:id', validate_api_key, authenticateToken, authorizeRoles('admin'), EventController.delete);

export default router;