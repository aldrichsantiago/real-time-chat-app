import mongoose from 'mongoose';
const { Schema } = mongoose;
import { randomUUID } from 'crypto'


const userSchema = new Schema({
  uid: { 
    type: 'String',
    unique: true,
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
  
},{timestamps: true});

export const User = mongoose.model('User', userSchema);
