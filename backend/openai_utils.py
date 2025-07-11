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


def generate_aws_command(prompt: str) -> dict:
    """
    Prompts OpenAI to return AWS CLI command with explanation in JSON format.
    Returns:
        {
            "code": "...",
            "explanation": "..."
        }
    """
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are an expert in AWS CLI. Respond only with a JSON object "
                        "that includes 'code' and 'explanation'. Do not include markdown or code blocks."
                    ),
                },
                {"role": "user", "content": prompt},
            ],
        )
        content = response.choices[0].message.content.strip()

        # Remove surrounding markdown if present
        if content.startswith("```") and content.endswith("```"):
            content = content.strip("` \n")

        return json.loads(content)

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail=f"Invalid JSON format from OpenAI.\nRaw response:\n{content}")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OpenAI API error: {str(e)}")
