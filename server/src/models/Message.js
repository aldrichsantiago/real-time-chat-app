import mongoose from 'mongoose';
import { randomUUID } from 'crypto'
const { Schema } = mongoose;


const messageSchema = new Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Converstaion',
    required: true
  },
  message: {
    type: String,
    required: true
  },
},{timestamps: true});

export const Message = mongoose.model('Message', messageSchema);
