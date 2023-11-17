import { mongoose } from 'mongoose'


export async function main() {
  await mongoose.connect('mongodb+srv://aldrichsantiago54:daIUVREHI5AounQM@chat-app-cluster.vjtethe.mongodb.net/?retryWrites=true&w=majority').catch(err=>console.log(err))
  console.log("DATABASE CONNECTED")

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

main().catch((err) => console.log(err));