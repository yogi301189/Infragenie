from fastapi import FastAPI, HTTPException, Request
from usage_limiter import enforce_limits
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai_utils import (
    generate_k8s_yaml,
    generate_terraform_code,
    generate_aws_command,
    generate_dockerfile_code,
    _chat_with_openai, chat_with_context # Needed for explanation and error check
)
from typing import List, Dict

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "InfraGenie backend is live"}

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------- Schemas ----------

class CodeRequest(BaseModel):
    type: str
    prompt: str
    mode: str = "command"  # "command" or "chat"

class PromptOnly(BaseModel):
    prompt: str

class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    type: str  # e.g., "kubernetes", "terraform", "dockerfile"

class ErrorCheckRequest(BaseModel):
    code: str
    type: str  # "kubernetes", "terraform", "dockerfile", or "python"

# ---------- Main Routes ----------

@app.post("/generate")
async def generate_code(request_data: CodeRequest, request: Request):
    await enforce_limits(request, "code")

    if request_data.type == "kubernetes":
        output = generate_k8s_yaml(request_data.prompt)
    elif request_data.type == "terraform":
        output = generate_terraform_code(request_data.prompt)
    elif request_data.type == "dockerfile":
        output = generate_dockerfile_code(request_data.prompt)
    else:
        raise HTTPException(status_code=400, detail="Invalid type")

    # Explanation only for chat mode
    if request_data.mode == "chat":
        explanation = _chat_with_openai(
            f"You are an expert in {request_data.type}. Explain the following {request_data.type} configuration:",
            output
        )
    else:
        explanation = "No explanation available in command mode."

    return {
        "code": output,
        "explanation": explanation
    }

@app.post("/aws-generate")
def aws_generate(request: PromptOnly):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is required")

    result = generate_aws_command(request.prompt)
    return result

@app.post("/check-error")
async def check_error(request_data: ErrorCheckRequest, request: Request):
    await enforce_limits(request, "error")

    if not request_data.code.strip():
        raise HTTPException(status_code=400, detail="Code is required")

    # Python-specific linting logic
    if request_data.type == "python":
        system_msg = (
            "You are a Python linter and fixer. "
            "Check the following Python code for errors, bad practices, or missing imports. "
            "Return the corrected code with inline comments starting with # explaining what was fixed."
        )
    else:
        system_msg = (
            f"You are an expert in {request_data.type}. "
            "Check the following code for errors. "
            "Fix the errors and show the corrected code with comments starting with # explaining what was fixed."
        )

    response = _chat_with_openai(system_msg, request_data.code)
    return {"corrected": response}

@app.post("/chat")
async def chat_conversational(request_data: ChatRequest, request: Request):
    await enforce_limits(request, "chat")
    print("📥 Chat input:", request_data.dict())
    try:
        reply = await chat_with_context(request_data.messages, request_data.type)
        print("📤 AI Reply:", reply)
        return {"response": reply}
    except Exception as e:
        print("❌ Chat failed:", e)
        return {"response": "❌ Error from OpenAI"}
@app.get("/debug")
def debug():
    return {"routes": [route.path for route in app.routes]}

