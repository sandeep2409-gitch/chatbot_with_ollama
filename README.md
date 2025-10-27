#  Jarvis  
### Your Personal Offline AI Assistant (FastAPI + Ollama + Docker)

![Jarvis Banner](https://img.shields.io/badge/Project-Offline%20Jarvis-blue?style=for-the-badge)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-green?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Deployed%20with-Docker-blue?style=for-the-badge&logo=docker)
![Python](https://img.shields.io/badge/Language-Python-yellow?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-MIT-lightgrey?style=for-the-badge)

---

## 🧩 Overview
**Offline Jarvis** is a lightweight AI chatbot that runs completely **offline** using  
**[FastAPI](https://fastapi.tiangolo.com/)** for the backend and **[Ollama](https://ollama.com/)** for local LLM inference.  
It uses **Llama 3.2:3B** (or any Ollama-supported model) and features a clean, minimal **web interface**.

Perfect for developers who want an offline ChatGPT-like assistant!

---

## ✨ Features
- 💬 Modern and responsive **chat interface**
- ⚙️ **FastAPI** backend with `/chat` endpoint
- 🧱 **Runs entirely offline** — no API keys or cloud calls
- 🧠 Powered by **Ollama** (supports Gemma, Llama, Phi, etc.)
- 📋 Copy-to-clipboard for AI responses
- 🪶 Markdown + Syntax highlighting for code blocks
- 🐳 One-command **Docker deployment**

---


## ⚙️ Requirements
Before you start, make sure you have:
- 🐍 **Python 3.10+** (optional if not using Docker)
- 🐋 **Docker** installed  
- 🤖 **Ollama** installed and running locally  
- 🧠 Model pulled (e.g., `llama3.2:3b`)

### Pull the Model:

```bash
ollama pull llama3.2:3b
```
If you want a different model (like gemma:2b or phi3), replace the model name accordingly.
---

## 🚀 Setup and Run

🧱 Step 1 — Build the Docker Image

Run this command in the project root (where your Dockerfile and app.py are located):
```bash
docker build -t offline-jarvis .
```
This command:
	•	Builds the Docker image.
	•	Tags it as offline-jarvis.

⸻

## ▶️ Step 2 — Run the Container

Once the image is built, start your container:
```bash
docker run -d -p 8000:8000 --name offline-jarvis -v ~/.ollama:/root/.ollama offline-jarvis
```
Explanation:
	•	-d → Run container in detached mode (background)
	•	-p 8000:8000 → Map port 8000 on host to port 8000 in container
	•	--name offline-jarvis → Assigns a name to the container
	•	-v ~/.ollama:/root/.ollama → Mounts local Ollama data inside container

⸻

🌐 Step 3 — Open in Browser

Once the container is running, open your browser and visit:

👉 http://localhost:8000/web

You’ll see your Offline Jarvis chatbot ready to chat 💬
### 🧱 Troubleshooting

❌ Container name already in use
```bash
docker rm -f offline-jarvis
```
## ollama not running
```bash
ollama serve
```
### 👨‍💻 Author

### Sandeep manchinasetti
💡 Built with ❤️ using FastAPI, Ollama, and Docker

⸻

### 📝 License

This project is licensed under the MIT License — feel free to use, modify, and share.

⸻

⭐ Star this repo if you found it helpful!






