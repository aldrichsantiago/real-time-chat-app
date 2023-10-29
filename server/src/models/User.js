import mongoose from 'mongoose';
const { Schema } = mongoose;


const userSchema = new Schema({
  name: String, // String is shorthand for {type: String}
  email: String,
  photoUrl: String,
  messagesId: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
});

export const User = mongoose.model('User', userSchema);

// await User.create({ name: 'person1' });