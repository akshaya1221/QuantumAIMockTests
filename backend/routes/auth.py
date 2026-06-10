from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from authentication.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from models.user import UserLogin, UserSignup
from storage import create_user, get_user_by_email


router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# This lets FastAPI Docs send a Bearer token to protected routes.
bearer_scheme = HTTPBearer()


def clean_email(email: str) -> str:
    """Store and compare emails in a consistent lowercase format."""
    return email.strip().lower()


def public_user(user: dict) -> dict:
    """Return user data without the password hash."""
    return {
        "id": user["id"],
        "name": user["name"],
        "email": user["email"],
        "class_level": user["class_level"],
        "target_exam": user["target_exam"],
    }


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user_data: UserSignup):
    """Create a new student account."""
    user = create_user(
        {
            "name": user_data.name,
            "email": clean_email(user_data.email),
            "hashed_password": hash_password(user_data.password),
            "class_level": user_data.class_level,
            "target_exam": user_data.target_exam,
        }
    )

    return {
        "message": "Signup successful",
        "user": public_user(user),
    }


@router.post("/login")
def login(login_data: UserLogin):
    """Verify student credentials and return a JWT token."""
    email = clean_email(login_data.email)
    user = get_user_by_email(email)

    if not user or not verify_password(
        login_data.password,
        user["hashed_password"],
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    access_token = create_access_token(
        data={
            "sub": user["email"],
            "user_id": user["id"],
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
    }


@router.get("/me")
def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme)):
    """Return the currently logged-in student from the JWT token."""
    token_data = decode_access_token(credentials.credentials)
    email = token_data.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    user = get_user_by_email(email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return public_user(user)