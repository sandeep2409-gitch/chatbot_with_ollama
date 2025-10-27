document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", (e) => {
  if (e.key === "Enter") sendMessage();
});

async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const message = input.value.trim();
  if (!message) return;


  appendMessage("user", message);
  input.value = "";
  chatBox.scrollTop = chatBox.scrollHeight;

  
  const res = await fetch("/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  const data = await res.json();
  const botReply = data.reply || "No response received.";
  appendMessage("bot", botReply);
}

function appendMessage(sender, text) {
  const chatBox = document.getElementById("chat-box");
  const msg = document.createElement("div");
  msg.className = `message ${sender}`;

  if (sender === "bot") {
 
    const html = marked.parse(text);
    msg.innerHTML = `${html}<button class="copy-btn" onclick="copyText(this)">Copy</button>`;
    chatBox.appendChild(msg);

    
    msg.querySelectorAll("pre code").forEach((block) => hljs.highlightElement(block));
  } else {
    msg.textContent = text;
  }

  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function copyText(button) {
  const text = button.parentElement.textContent.replace("Copy", "").trim();
  navigator.clipboard.writeText(text);
  button.textContent = "Copied!";
  setTimeout(() => (button.textContent = "Copy"), 1500);
}
