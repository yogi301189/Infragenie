from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from openai_utils import (
    generate_k8s_yaml,
    generate_terraform_code,
    generate_aws_command,
    generate_dockerfile_code,
)

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "InfraGenie backend is live"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Updated to include 'mode'
class CodeRequest(BaseModel):
    type: str
    prompt: str
    mode: str = "command"  # default fallback if frontend doesn't send it

class PromptOnly(BaseModel):
    prompt: str

@app.post("/generate")
def generate_code(request: CodeRequest):
    if request.type == "kubernetes":
        code, explanation = generate_k8s_yaml(request.prompt, request.mode)
    elif request.type == "terraform":
        code, explanation = generate_terraform_code(request.prompt, request.mode)
    elif request.type == "dockerfile":
        code, explanation = generate_dockerfile_code(request.prompt, request.mode)
    else:
        raise HTTPException(status_code=400, detail="Invalid type")

    return {
        "code": code,
        "explanation": explanation
    }

@app.post("/aws-generate")
def aws_generate(request: PromptOnly):
    if not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt is required")

    result = generate_aws_command(request.prompt)
    return result
