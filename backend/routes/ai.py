import json
import os
import urllib.error
import urllib.request
from pathlib import Path

from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from authentication.security import decode_access_token
from models.ai import AITutorRequest


# Load backend/.env reliably even if Uvicorn is started from another folder.
ENV_PATH = Path(__file__).resolve().parent.parent / ".env"
load_dotenv(dotenv_path=ENV_PATH)

router = APIRouter(prefix="/api/ai", tags=["AI Tutor"])

# This reads the Authorization: Bearer <token> header.
bearer_scheme = HTTPBearer()


def require_logged_in_user(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> str:
    """Make sure the request has a valid JWT token."""
    token_data = decode_access_token(credentials.credentials)
    email = token_data.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    return email


def build_tutor_prompt(request_data: AITutorRequest) -> str:
    """Create a JEE-focused prompt for Gemini."""
    subject_line = f"Subject: {request_data.subject}" if request_data.subject else ""
    topic_line = f"Topic: {request_data.topic}" if request_data.topic else ""

    return f"""
You are an expert IIT-JEE teacher for Physics, Chemistry and Mathematics.
Answer the student's question like a serious JEE mentor.

Rules:
- Explain clearly in simple language.
- Use step-by-step explanation.
- Mention important JEE points.
- Include formulas when needed.
- Add one small example if useful.
- Keep the answer focused and not unnecessarily long.

{subject_line}
{topic_line}
Question: {request_data.question}
""".strip()


def call_gemini(prompt: str) -> str:
    """Send the prompt to Gemini and return the generated answer."""
    api_key = os.getenv("GEMINI_API_KEY")

    if not api_key:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="GEMINI_API_KEY is missing. Add it to your .env file.",
        )

    request_body = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ],
        "generationConfig": {
            "temperature": 0.4,
            "maxOutputTokens": 700,
        },
    }

    request = urllib.request.Request(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Content-Type": "application/json",
            "x-goog-api-key": api_key,
        },
        method="POST",
    )

    try:
        with urllib.request.urlopen(request, timeout=30) as response:
            response_data = json.loads(response.read().decode("utf-8"))
    except urllib.error.HTTPError as error:
        error_text = error.read().decode("utf-8")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Gemini API request failed: {error_text}",
        )
    except urllib.error.URLError as error:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Could not reach Gemini API: {error.reason}",
        )

    try:
        return response_data["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Gemini API returned an unexpected response.",
        )


@router.post("/tutor")
def ai_tutor(
    request_data: AITutorRequest,
    _email: str = Depends(require_logged_in_user),
):
    """Answer a logged-in student's IIT-JEE doubt using Gemini."""
    prompt = build_tutor_prompt(request_data)
    answer = call_gemini(prompt)

    return {"answer": answer}
