import mongoose from 'mongoose';
const { Schema } = mongoose;
import { randomUUID } from 'crypto'


const userSchema = new Schema({
  uid: { 
    type: 'String',
    default: null
  },
  name: { 
    type: String,
    default: null
  },
  email: { 
    type: String, 
    unique: true 
  },
  photoURL: { 
    type: String,
    default: null
  },
  dateCreated: { 
    type: Date, 
    default: Date.now 
  },
});

export const User = mongoose.model('User', userSchema);
