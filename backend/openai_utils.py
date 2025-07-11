import os
import json
from openai import OpenAI
from dotenv import load_dotenv
from fastapi import HTTPException

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))


# Utility to safely call OpenAI with a given system role and prompt
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


def generate_k8s_yaml(prompt):
    return _chat_with_openai("You are a Kubernetes YAML generator.", prompt)


def generate_terraform_code(prompt):
    return _chat_with_openai("You are a Terraform code generator.", prompt)


def generate_dockerfile_code(prompt):
    return _chat_with_openai("You are a Dockerfile generator.", prompt)


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
