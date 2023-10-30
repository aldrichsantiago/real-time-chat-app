import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
const { Schema } = mongoose;


const groupMemberSchema = new Schema({
    groupMemberId: {
        type: String,
        default: null
    },
    conversationId: {
        type: 'UUID',
        default: null
    },
    joinedDate: { 
        type: Date, 
        default: Date.now 
    },
    leftDate: { 
        type: Date,
        default: null
    },
});

export const GroupMember = mongoose.model('GroupMember', groupMemberSchema);
