import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
const { Schema } = mongoose;


const messageSchema = new Schema({
  messageId: {
    type: 'UUID',
    default: () => randomUUID()
  },
  message: String,
  sendDate: { 
    type: Date, 
    default: Date.now 
  },
  senderEmail: String,
  receiverEmail: String,
  senderUID: String,
  receiverUID: String,
  conversationId: String
});

export const Message = mongoose.model('Message', messageSchema);
