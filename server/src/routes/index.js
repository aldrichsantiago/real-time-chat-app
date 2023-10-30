import express from "express";
import { createUser, getUserByEmail } from "../controllers/Users.js";
import { createMessage, getMessagesOfUser } from "../controllers/Messages.js";

const router = express.Router();

// UserRoutes
router.post('/user', createUser);
router.post('/users/email', getUserByEmail);



// MessageRoutes
router.get('/message', createMessage);
router.get('/messages/:userId', getMessagesOfUser);



export default router