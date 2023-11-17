import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { main } from './src/config/db.js';
import router from './src/routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';
import { instrument } from '@socket.io/admin-ui';

const app = express();
const server = createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ 
  origin:['http://localhost:5173', 'https://admin.socket.io','https://real-time-chat-app-aldrichsantiagos-projects.vercel.app','*'],
  methods: ['GET','POST','DELETE','PUT','PATCH'],
  credentials: true 
}));
app.use(router);



const io = new Server(server, {
  cors: {
    origin:['http://localhost:5173', 'https://admin.socket.io','*', 'https://real-time-chat-app-aldrichsantiagos-projects.vercel.app'],
    credentials: true
  }
});


instrument(io, {auth:false})


app.get('/', async(req, res) => {
  console.log("API IS WORKING")
  res.json({MESSAGE: "API IS WORKING"});
});

io.on('connection', (socket) => {
  console.log('a user connected '+ socket.id);

  socket.on('send-message', (message, room) => {
    if (room === "") {
      socket.broadcast.emit('receive-message', message)
    } else {
      socket.to(room).emit('receive-message', message)
    }
  })

  socket.on('join-conversation', room => {
    console.log('a user joined '+ room);
    socket.join(room)
  })
});


server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});