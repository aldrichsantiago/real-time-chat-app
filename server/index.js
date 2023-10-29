import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { main } from './src/config/db.js';
import { User } from './src/models/User.js';

const app = express();
const server = createServer(app);


const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173"
    }
  });

app.get('/', async(req, res) => {

  const tennisPlayers = await User.find(
    { sport: "Tennis" },
    "name age",
  ).exec();

  console.log(tennisPlayers)
  res.json(tennisPlayers);
});

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});