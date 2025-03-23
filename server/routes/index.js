import express from "express";
import { loginWithEmail,registerwithemail } from "../controllers/authControllers.js";
import protect  from "../middlewares/authMiddleware.js";
import { validateServerRequest } from "../middlewares/internalroutes.js";
import { verifyToken, generateToken } from "../controllers/sessionController.js";

const router = express.Router();


router.post("/login/email", protect, loginWithEmail);
router.post("/register/email", protect, registerwithemail);
router.post("/session/createtoken", validateServerRequest, generateToken);
router.get("/session/verifytoken", validateServerRequest, verifyToken);
export default router;
