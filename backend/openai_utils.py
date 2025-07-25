import os
import json
import re
import logging
from openai import AsyncOpenAI  
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Optional: enable this if you want logs in Render logs
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# 🔧 Generic OpenAI caller
async def _chat_with_openai(system_msg: str, prompt: str):
    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

# 🔧 Extract code block from markdown
def _extract_code_block(text: str):
    match = re.search(r"```(?:\w+)?\n([\s\S]*?)```", text)
    return match.group(1).strip() if match else text.strip()

# ✅ Kubernetes YAML generator
async def generate_k8s_yaml(prompt, mode="command"):
    if mode == "command":
        raw = await _chat_with_openai("You are a Kubernetes YAML generator. Only return YAML code without explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = await _chat_with_openai("You are a Kubernetes expert. First generate the YAML, then explain it.", prompt)
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```yaml\n{code}\n```", "").strip()
        return code, explanation

# ✅ Terraform code generator
async def generate_terraform_code(prompt, mode="command"):
    if mode == "command":
        raw = await _chat_with_openai("You are a Terraform generator. Only return code without any explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = await _chat_with_openai("You are a Terraform expert. First generate code, then explain it.", prompt)
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```hcl\n{code}\n```", "").strip()
        return code, explanation

# ✅ Dockerfile generator
async def generate_dockerfile_code(prompt, mode="command"):
    if mode == "command":
        raw = await _chat_with_openai("You are a Docker expert. Generate Dockerfile only. No explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = await _chat_with_openai("You are a Docker expert. First generate the Dockerfile, then explain it.", prompt)
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```Dockerfile\n{code}\n```", "").strip()
        return code, explanation

# ✅ AWS CLI handler - Option 1: Use JSON array
async def generate_aws_command(prompt):
    try:
        raw = await _chat_with_openai(
            system_msg=(
                "You are an expert in AWS CLI. "
                "Given a user prompt, return a JSON array where each item has two fields: 'code' and 'explanation'. "
                "Each 'code' should be a step in a multi-line AWS CLI command (using backslashes for continuation). "
                "Avoid markdown formatting or code fences. Only return a valid JSON array."
            ),
            prompt=prompt
        )

        result_list = json.loads(raw)

        # Combine all command steps into one multi-line command
        full_command = "\n".join(item["code"] for item in result_list)
        explanation = "\n\n".join(item["explanation"] for item in result_list)

        return {
            "code": full_command,
            "explanation": explanation
        }

    except json.JSONDecodeError as jde:
        return {
            "code": "",
            "explanation": f"Invalid JSON returned by OpenAI: {str(jde)}\nRaw: {raw}"
        }
    except Exception as e:
        return {
            "code": "",
            "explanation": f"Failed to parse AWS response: {str(e)}"
        }
# ✅ Chat-based contextual conversation
async def chat_with_context(messages, code_type="kubernetes"):
    # 🧠 Extract the latest prompt
    prompt = messages[-1]["content"].lower().strip() if messages else ""

    casual_greetings = ["hi", "hello", "hey", "how are you"]
    if prompt in casual_greetings:
        return "👋 Hello! I'm InfraGenie. Ask me to generate Kubernetes, Terraform, or Dockerfile configurations."

    system_msg = {
        "kubernetes": "You are an expert in Kubernetes...",
        "terraform": "You are an expert in Terraform...",
        "dockerfile": "You are a Dockerfile expert..."
    }.get(code_type.lower(), "You are a helpful DevOps assistant.")

    try:
        response = await client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": system_msg}] + messages,
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")


async def generate_aws_command_v2(prompt: str) -> dict:
    try:
        raw = await _chat_with_openai(
            system_msg=(
                "You are an expert in AWS CLI. "
                "Generate an AWS CLI command based on the given prompt. "
                "Respond ONLY in this format:\n\n"
                "Command:\n```bash\n<cli command>\n```\n\nExplanation:\n<brief explanation>\n\n"
                "Do NOT include anything else in the output."
            ),
            prompt=prompt
        )

        # Extract command
        code_match = re.search(r"```(?:bash)?\n(.+?)\n```", raw, re.DOTALL)
        code = code_match.group(1).strip() if code_match else ""

        # Extract explanation
        explanation_match = re.search(r"Explanation:\s*(.+)", raw, re.DOTALL)
        explanation = explanation_match.group(1).strip() if explanation_match else ""

        return {
            "code": code,
            "explanation": explanation
        }

    except Exception as e:
        return {
            "code": "",
            "explanation": f"Failed to generate AWS CLI command: {str(e)}\nRaw: {raw}"
        }
