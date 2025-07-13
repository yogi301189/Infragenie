# usage_limiter.py
from fastapi import Request, HTTPException
from datetime import datetime
from collections import defaultdict
import threading

# In-memory temporary store (can be replaced with Redis/Firestore)
ip_usage = defaultdict(lambda: {"date": None, "code": 0, "chat": 0, "error": 0})
user_usage = defaultdict(lambda: {"date": None, "code": 0, "chat": 0, "error": 0})
lock = threading.Lock()

# Limits
LIMITS = {
    "guest": {"code": 10, "chat": 3, "error": 10},
    "free": {"code": 30, "chat": 3, "error": 30},
    "premium": {"code": float("inf"), "chat": float("inf"), "error": float("inf")},
}

def reset_daily(usage):
    today = datetime.utcnow().date()
    if usage["date"] != today:
        usage["date"] = today
        usage["code"] = 0
        usage["chat"] = 0
        usage["error"] = 0

# Call this in each route
async def enforce_limits(request: Request, category: str):
    user_id = request.headers.get("x-user-id")
    plan = request.headers.get("x-user-plan", "guest")  # guest, free, premium

    with lock:
        if user_id:
            usage = user_usage[user_id]
        else:
            client_ip = request.client.host
            usage = ip_usage[client_ip]

        reset_daily(usage)

        max_allowed = LIMITS.get(plan, LIMITS["guest"])[category]

        if usage[category] >= max_allowed:
            raise HTTPException(
                status_code=403,
                detail=f"Daily {category} limit reached for {plan} plan."
            )

        usage[category] += 1
