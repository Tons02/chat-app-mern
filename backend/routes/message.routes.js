import express from 'express';
import { sendMessage } from "../controllers/message.controller.js";
import protectedRoute from '../midleware/protectedRoute.js';

const router = express.Router();

router.post("/send/:id", protectedRoute, sendMessage);

 

export default router; 