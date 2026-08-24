const socket = io();

const loginScreen = document.getElementById('login-screen');
const chatScreen = document.getElementById('chat-screen');
const loginForm = document.getElementById('login-form');
const usernameInput = document.getElementById('username');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');
const messages = document.getElementById('messages');
const userCount = document.getElementById('user-count');

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const username = usernameInput.value.trim();
  if (!username) return;

  socket.emit('join', username);
  loginScreen.classList.add('hidden');
  chatScreen.classList.remove('hidden');
  messageInput.focus();
});

messageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  socket.emit('chat message', message);
  messageInput.value = '';
  messageInput.focus();
});

socket.on('chat message', ({ username, message, timestamp }) => {
  const item = document.createElement('li');
  item.className = 'message';

  const header = document.createElement('div');
  header.className = 'message-header';
  header.textContent = `${username} • ${new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

  const body = document.createElement('div');
  body.textContent = message;

  item.append(header, body);
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('system message', (message) => {
  const item = document.createElement('li');
  item.className = 'system-message';
  item.textContent = message;
  messages.appendChild(item);
  messages.scrollTop = messages.scrollHeight;
});

socket.on('user count', (count) => {
  userCount.textContent = count;
});
