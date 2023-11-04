import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
const { Schema } = mongoose;


const conversationSchema = new Schema({
    conversationName: {
        type: String,
        default: null
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }]
});

export const Conversation = mongoose.model('Conversation', conversationSchema);
