import os
import json
from openai import AsyncOpenAI  
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()
client = AsyncOpenAI (api_key=os.getenv("OPENAI_API_KEY"))

# 🔧 Generic OpenAI caller
def _chat_with_openai(system_msg: str, prompt: str):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": system_msg},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")

# 🔧 Extracts code from markdown block
def _extract_code_block(text: str):
    import re
    match = re.search(r"```(?:\w+)?\n([\s\S]*?)```", text)
    return match.group(1).strip() if match else text.strip()

# ✅ K8s Generator with mode
def generate_k8s_yaml(prompt, mode="command"):
    if mode == "command":
        raw = _chat_with_openai("You are a Kubernetes YAML generator. Only return YAML code without explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = _chat_with_openai("You are a Kubernetes expert. First generate the YAML, then explain it.", prompt)
        parts = raw.split("```")
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```yaml\n{code}\n```", "").strip()
        return code, explanation

# ✅ Terraform Generator with mode
def generate_terraform_code(prompt, mode="command"):
    if mode == "command":
        raw = _chat_with_openai("You are a Terraform generator. Only return code without any explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = _chat_with_openai("You are a Terraform expert. First generate code, then explain it.", prompt)
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```hcl\n{code}\n```", "").strip()
        return code, explanation

# ✅ Dockerfile Generator with mode
def generate_dockerfile_code(prompt, mode="command"):
    if mode == "command":
        raw = _chat_with_openai("You are a Docker expert. Generate Dockerfile only. No explanation.", prompt)
        return _extract_code_block(raw), ""
    else:
        raw = _chat_with_openai("You are a Docker expert. First generate the Dockerfile, then explain it.", prompt)
        code = _extract_code_block(raw)
        explanation = raw.replace(f"```Dockerfile\n{code}\n```", "").strip()
        return code, explanation

# ✅ AWS CLI Handler (already returns structured response)
def generate_aws_command(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": (
                    "You are an expert in AWS CLI. "
                    "Always return a JSON object with two fields: 'code' and 'explanation'. "
                    "Format multi-step commands in proper multiline syntax using backslashes (\\) for line continuation. "
                    "Avoid semicolons (;) unless required. Do NOT return markdown or code fences."
                ),
            },
            {"role": "user", "content": prompt},
        ],
    )

    try:
        content = response.choices[0].message.content.strip()
        return json.loads(content)
    except Exception as e:
        return {
            "code": "",
            "explanation": f"Failed to parse AWS response: {str(e)}\n\nRaw content: {content}"
        }
async def chat_with_context(messages, code_type="kubernetes"):
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

