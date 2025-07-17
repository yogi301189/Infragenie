from fastapi import Request, status
from fastapi.responses import JSONResponse

# Define custom exception for limit exceeded
class LimitExceededException(Exception):
    def __init__(self, name: str):
        self.name = name

# Exception handler
async def limit_exceeded_handler(request: Request, exc: LimitExceededException):
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "error": "Limit Exceeded",
            "code": 429,
            "detail": f"You have exceeded the limit for {exc.name}. Please upgrade your plan or wait until reset."
        },
    )
