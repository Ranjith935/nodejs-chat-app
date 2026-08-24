const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

io.on('connection', (socket) => {
  socket.on('join', (username) => {
    const name = String(username || 'Anonymous').trim().slice(0, 30) || 'Anonymous';
    socket.username = name;

    socket.broadcast.emit('system message', `${name} joined the chat`);
    io.emit('user count', io.engine.clientsCount);
  });

  socket.on('chat message', (message) => {
    const text = String(message || '').trim().slice(0, 500);
    if (!text) return;

    io.emit('chat message', {
      username: socket.username || 'Anonymous',
      message: text,
      timestamp: new Date().toISOString()
    });
  });

  socket.on('disconnect', () => {
    if (socket.username) {
      socket.broadcast.emit('system message', `${socket.username} left the chat`);
    }
    io.emit('user count', io.engine.clientsCount);
  });
});

server.listen(PORT, () => {
  console.log(`Chat app running on http://localhost:${PORT}`);
});
