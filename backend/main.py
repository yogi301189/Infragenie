from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai_utils import generate_k8s_yaml, generate_terraform_code
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow all CORS origins (for frontend to call backend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define request model
class CodeRequest(BaseModel):
    type: str
    prompt: str

@app.post("/generate")
def generate_code(request: CodeRequest):
    if request.type == "kubernetes":
        output = generate_k8s_yaml(request.prompt)
    elif request.type == "terraform":
        output = generate_terraform_code(request.prompt)
    else:
        raise HTTPException(status_code=400, detail="Invalid type")

    return {"code": output}
