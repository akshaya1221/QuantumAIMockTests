from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from authentication.security import decode_access_token
from database.connection import get_database
from models.student import StudentSelection


router = APIRouter(prefix="/api/student", tags=["Student"])

# This reads the Authorization: Bearer <token> header.
bearer_scheme = HTTPBearer()


def get_logged_in_user_email(
    credentials: HTTPAuthorizationCredentials = Depends(bearer_scheme),
) -> str:
    """Get the logged-in user's email from the JWT token."""
    token_data = decode_access_token(credentials.credentials)
    email = token_data.get("sub")

    if not email:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )

    return email


@router.post("/selection")
def save_student_selection(
    selection: StudentSelection,
    email: str = Depends(get_logged_in_user_email),
):
    """Save or update the logged-in student's selected subject and topic."""
    database = get_database()
    users_collection = database["users"]

    result = users_collection.update_one(
        {"email": email},
        {
            "$set": {
                "selected_subject": selection.subject,
                "selected_topic": selection.topic,
            }
        },
    )

    if result.matched_count == 0:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "message": "Selection saved successfully",
        "selected_subject": selection.subject,
        "selected_topic": selection.topic,
    }


@router.get("/selection")
def get_student_selection(email: str = Depends(get_logged_in_user_email)):
    """Return the logged-in student's saved subject and topic."""
    database = get_database()
    users_collection = database["users"]

    user = users_collection.find_one(
        {"email": email},
        {"_id": 0, "selected_subject": 1, "selected_topic": 1},
    )

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    return {
        "selected_subject": user.get("selected_subject"),
        "selected_topic": user.get("selected_topic"),
    }
