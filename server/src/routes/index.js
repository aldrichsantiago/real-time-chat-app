import express from "express";
import { createConversation, createUser, createUserByEmail, getConversations } from "../controllers/Users.js";
import { createMessage, getMessagesOfUsers } from "../controllers/Messages.js";

const router = express.Router();

// UserRoutes
router.post('/user', createUser);
router.post('/users/new/email', createUserByEmail);
router.post('/users/create-conversation', createConversation);
router.post('/users/get-conversations', getConversations);



// MessageRoutes
router.post('/message', createMessage);
router.get('/messages/:userId', getMessagesOfUsers);



export default router