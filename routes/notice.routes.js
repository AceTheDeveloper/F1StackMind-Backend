import express from 'express';
import authenticateToken from '../middlewares/auth.middleware.js';
import { authorizeRoles } from '../middlewares/role.middleware.js';
import validate_api_key from '../middlewares/api_key.middleware.js';
import NoticeController from '../controllers/NoticeController.js';

const router = express.Router();

router.get('/notice/show', validate_api_key, authenticateToken, authorizeRoles('admin'), NoticeController.show)
router.post('/notice/create', validate_api_key, authenticateToken, authorizeRoles('admin'), NoticeController.create);
router.post('/notice/delete/:id', validate_api_key, authenticateToken, authorizeRoles('admin'), NoticeController.delete);
export default router;