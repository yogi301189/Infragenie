import os
import json
from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def generate_k8s_yaml(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Kubernetes YAML generator."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

def generate_terraform_code(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Terraform code generator."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content
def generate_dockerfile_code(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a Terraform code generator."},
            {"role": "user", "content": prompt}
        ]
    )
    return response.choices[0].message.content

# ✅ New function for AWS CLI command generation
def generate_aws_command(prompt):
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

    try:
        content = response.choices[0].message.content.strip()
        return json.loads(content)  # expecting {"code": "...", "explanation": "..."}
    except Exception as e:
        return {
            "code": "",
            "explanation": f"Failed to parse AWS response: {str(e)}\n\nRaw content: {content}"
        }
