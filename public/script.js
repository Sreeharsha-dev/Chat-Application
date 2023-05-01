const socket = io();
const userContainer = document.getElementById('user-container');
const userForm = document.getElementById('user-form');
const userInput = document.getElementById('user-input');
const chatContainer = document.getElementById('chat-container');
const messages = document.getElementById('messages');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message-input');

let userName = '';

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userName = userInput.value;
  userContainer.style.display = 'none';
  chatContainer.style.display = 'flex';
});

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  socket.emit('chat message', { name: userName, message });
  messageInput.value = '';
});

socket.on('chat message', ({ name, message }) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = `${name}: ${message}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});
