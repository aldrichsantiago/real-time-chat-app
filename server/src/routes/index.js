import express from "express";
import { createConversation, createUser, createUserByEmail, getContact, getConversations } from "../controllers/Users.js";
import { createMessage, getConversationMessages } from "../controllers/Messages.js";

const router = express.Router();

// UserRoutes
router.post('/user', createUser);
router.post('/users/new/email', createUserByEmail);

// ConversationRoutes
router.post('/users/create-conversation', createConversation);
router.post('/users/get-conversations', getConversations);
router.post('/users/get-members', getContact);

// MessageRoutes
router.post('/message', createMessage);
router.post('/messages/get-messages', getConversationMessages);



export default router