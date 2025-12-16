import express from "express";
import JoinController from "../controllers/JoinController.js";

const router = express.Router();

router.post("/join", JoinController.join);

export default router;
