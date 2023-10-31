import express from "express";
import { createConversation, createUser, createUserByEmail } from "../controllers/Users.js";
import { createMessage, getMessagesOfUser } from "../controllers/Messages.js";

const router = express.Router();

// UserRoutes
router.post('/user', createUser);
router.post('/users/new/email', createUserByEmail);
router.post('/users/email', createConversation);



// MessageRoutes
router.post('/message', createMessage);
router.get('/messages/:userId', getMessagesOfUser);



export default router