const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

async function sendMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, 'user');
  userInput.value = '';

  appendMessage('Thinking...', 'bot', true);

  const response = await fetch('/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  });

  const data = await response.json();

  // 🧠 Render Markdown + highlight code
  const html = marked.parse(data.reply);
  const botMsg = document.querySelector('.bot:last-child');
  botMsg.innerHTML = html;

  // Apply syntax highlighting
  botMsg.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

function appendMessage(content, sender, isTemp = false) {
  const div = document.createElement('div');
  div.classList.add('message', sender);
  div.innerHTML = content;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') sendMessage();
});