from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
import requests
import json

app = FastAPI()


app.mount("/web", StaticFiles(directory="web", html=True), name="web")

@app.get("/", response_class=HTMLResponse)
async def root():
    with open("web/index.html") as f:
        return HTMLResponse(content=f.read())

@app.post("/chat")
async def chat(request: Request):
    data = await request.json()
    user_message = data.get("message", "")

    
    try:
        response = requests.post(
            "http://host.docker.internal:11434/api/generate",
            json={"model": "jarvis", "prompt": user_message},
            stream=True,
            timeout=120
        )

        bot_reply = ""
        for line in response.iter_lines():
            if line:
                chunk = json.loads(line.decode("utf-8"))
                if "response" in chunk:
                    bot_reply += chunk["response"]

        return JSONResponse({"reply": bot_reply})

    except Exception as e:
        return JSONResponse({"reply": f"Error: {str(e)}"})