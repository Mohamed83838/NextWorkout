import express from "express";
import { loginWithEmail,registerwithemail } from "../controllers/authControllers.js";
import protect  from "../middlewares/authMiddleware.js";
import { validateServerRequest } from "../middlewares/internalroutes.js";
import { AddWorkout, DeleteWorkout, RetrieveWorkout, RetrieveWorkouts } from  "../controllers/WorkoutController.js";   
import {workoutMiddleware} from "../middlewares/workoutMiddleware.js";
import { verifyToken, generateToken } from "../controllers/sessionController.js";


const router = express.Router();


router.post("/login/email", protect, loginWithEmail);
router.post("/register/email", protect, registerwithemail);
router.post("/session/createtoken", validateServerRequest, generateToken);
router.post("/session/verifytoken", validateServerRequest, verifyToken);
router.post("/workout/add", workoutMiddleware, AddWorkout);
router.post("/workout/delete", workoutMiddleware, DeleteWorkout);
router.post("/workout/get", workoutMiddleware, RetrieveWorkout);
router.post("/workout/getall", workoutMiddleware, RetrieveWorkouts);
export default router;
