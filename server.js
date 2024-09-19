import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on('connection', (socket) => {
  console.log('Um usuário se conectou');

  socket.on('send_message', (message) => {
    console.log('Mensagem recebida:', message);
    // Enviar a mensagem para todos os clientes conectados
    io.emit('receive_message', message);
  });

  socket.on('disconnect', () => {
    console.log('Um usuário se desconectou');
  });
});

server.listen(3001, () => {
  console.log('Servidor WebSocket rodando na porta 3001');
});
