import express from "express";
import ApplicantController from "../controllers/ApplicantController.js";
import authenticateToken from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get("/applicants/show", authenticateToken, authorizeRoles('admin'), ApplicantController.showApplicants);
router.get("/applicants/showDetails/:id", authenticateToken, authorizeRoles('admin'), ApplicantController.showDetails);
router.post('/applicants/accept', authenticateToken, authorizeRoles('admin'), ApplicantController.acceptApplicant);

export default router;
