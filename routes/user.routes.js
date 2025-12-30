import express from 'express'
import authenticateToken from '../middlewares/auth.middleware.js';
import UserController from '../controllers/UserController.js'
import multer from 'multer';

const router = express.Router();

// for multer purpose
const upload = multer({dest : "upload/"})

router.get('/user/show/:id', authenticateToken, UserController.show);
router.post('/user/update/:id', authenticateToken, upload.single('image'), UserController.update);


export default router;