import { mongoose } from 'mongoose'


export async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/real-time-chat-app');
  console.log("DATABASE CONNECTED")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) => console.log(err));