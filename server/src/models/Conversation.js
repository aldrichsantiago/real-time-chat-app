import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
const { Schema } = mongoose;


const conversationSchema = new Schema({
    conversationId: {
        type: 'String',
        default: () => randomUUID()
    },
    conversationName: {
        type:String,
        default: null
    },
});

export const Conversation = mongoose.model('Conversation', conversationSchema);
