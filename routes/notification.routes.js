import express from 'express'
import NotificationController from '../controllers/NotificationController.js';

const router = express.Router();

router.post('/notification/create', NotificationController.create);

export default router;