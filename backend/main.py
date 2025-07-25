from fastapi.responses import JSONResponse
from fastapi import FastAPI, HTTPException, Request
from usage_limiter import enforce_limits
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai_utils import (
    generate_k8s_yaml,
    generate_terraform_code,
    generate_aws_command,generate_aws_command_v2,
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

class AWSPromptInput(BaseModel):
    prompt: str
    category: str = "General"

# ---------- Main Routes ----------

@app.post("/generate")
async def generate_code(request_data: CodeRequest, request: Request):
    await enforce_limits(request, "code")

    if request_data.type == "kubernetes":
        code, explanation = await generate_k8s_yaml(request_data.prompt, request_data.mode)
    elif request_data.type == "terraform":
        code, explanation = await generate_terraform_code(request_data.prompt, request_data.mode)
    elif request_data.type == "dockerfile":
        code, explanation = await generate_dockerfile_code(request_data.prompt, request_data.mode)
    else:
        raise HTTPException(status_code=400, detail="Invalid type")

    return {
        "code": code,
        "explanation": explanation or "No explanation available in command mode."
    }


@app.post("/aws-generate")
async def aws_generate(request: PromptOnly):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is required")

    result = await generate_aws_command(request.prompt)
    return JSONResponse(content=result) 

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

    response = await _chat_with_openai(system_msg, request_data.code)
    return {"corrected": response}

@app.post("/chat")
async def chat_conversational(request_data: ChatRequest, request: Request):
    #await enforce_limits(request, "chat")
    print("📥 Chat input:", request_data.dict())
    try:
        reply = await chat_with_context(request_data.messages, request_data.type)
        print("📤 AI Reply:", reply)
        return {"response": reply}
    except Exception as e:
        print("❌ Chat failed:", e)
        return {"response": "❌ Error from OpenAI"}
@app.post("/aws-generate-v2")
async def aws_generate(request: AwsPrompt):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is required")

    # You can pass category if needed in future improvements
    prompt_text = f"[{request.category}] {request.prompt}"
    result = await generate_aws_command(prompt_text)
    return JSONResponse(content=result)

@app.get("/debug")
def debug():
    return {"routes": [route.path for route in app.routes]}

