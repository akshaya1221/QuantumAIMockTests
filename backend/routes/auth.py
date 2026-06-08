from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from authentication.security import (
    create_access_token,
    decode_access_token,
    hash_password,
    verify_password,
)
from database.connection import get_database
from models.user import UserLogin, UserSignup


router = APIRouter(prefix="/api/auth", tags=["Authentication"])

# This lets FastAPI Docs send a Bearer token to protected routes.
bearer_scheme = HTTPBearer()


def clean_email(email: str) -> str:
    """Store and compare emails in a consistent lowercase format."""
    return email.strip().lower()


def public_user(user: dict) -> dict:
    """Return user data without the password hash or MongoDB ObjectId object."""
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "class_level": user["class_level"],
        "target_exam": user["target_exam"],
    }


@router.post("/signup", status_code=status.HTTP_201_CREATED)
def signup(user_data: UserSignup):
    """Create a new student account."""
    database = get_database()
    users_collection = database["users"]

    email = clean_email(user_data.email)
    existing_user = users_collection.find_one({"email": email})

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    user_document = {
        "name": user_data.name,
        "email": email,
        "hashed_password": hash_password(user_data.password),
        "class_level": user_data.class_level,
        "target_exam": user_data.target_exam,
        "created_at": datetime.now(timezone.utc),
    }

    result = users_collection.insert_one(user_document)
    user_document["_id"] = result.inserted_id

    return {
        "message": "Signup successful",
        "user": public_user(user_document),
    }


@router.post("/login")
def login(login_data: UserLogin):
    """Verify student credentials and return a JWT token."""
    database = get_database()
    users_collection = database["users"]

    email = clean_email(login_data.email)
    user = users_collection.find_one({"email": email})

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
            "user_id": str(user["_id"]),
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

    database = get_database()
    users_collection = database["users"]
    user = users_collection.find_one({"email": email})

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return public_user(user)
