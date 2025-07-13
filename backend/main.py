from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai_utils import (
    generate_k8s_yaml,
    generate_terraform_code,
    generate_aws_command,
    generate_dockerfile_code,
    _chat_with_openai,  # Needed for explanation and error check
)

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

class ErrorCheckRequest(BaseModel):
    code: str
    type: str  # "kubernetes", "terraform", "dockerfile", or "python"

# ---------- Main Routes ----------

@app.post("/generate")
def generate_code(request: CodeRequest):
    if request.type == "kubernetes":
        output = generate_k8s_yaml(request.prompt)
    elif request.type == "terraform":
        output = generate_terraform_code(request.prompt)
    elif request.type == "dockerfile":
        output = generate_dockerfile_code(request.prompt)
    else:
        raise HTTPException(status_code=400, detail="Invalid type")

    # Explanation only for chat mode
    if request.mode == "chat":
        explanation = _chat_with_openai(
            f"You are an expert in {request.type}. Explain the following {request.type} configuration:",
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
def check_error(request: ErrorCheckRequest):
    if not request.code.strip():
        raise HTTPException(status_code=400, detail="Code is required")

    # Python-specific linting logic
    if request.type == "python":
        system_msg = (
            "You are a Python linter and fixer. "
            "Check the following Python code for errors, bad practices, or missing imports. "
            "Return the corrected code with inline comments starting with # explaining what was fixed."
        )
    else:
        system_msg = (
            f"You are an expert in {request.type}. "
            "Check the following code for errors. "
            "Fix the errors and show the corrected code with comments starting with # explaining what was fixed."
        )

    response = _chat_with_openai(system_msg, request.code)
    return {"corrected": response}
