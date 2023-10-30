import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import { main } from './src/config/db.js';
import router from './src/routes/index.js';
import cors from 'cors';
import bodyParser from 'body-parser';


const app = express();
const server = createServer(app);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({ 
  origin:['http://localhost:5173', '*'],
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH'] 
}));
app.use(router)



const io = new Server(server, {
    // cors: {
    //   origin: "http://localhost:5173"
    // }
});


app.get('/', async(req, res) => {
  console.log("API IS WORKING")
  res.json({MESSAGE: "API IS WORKING"});
});



io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});