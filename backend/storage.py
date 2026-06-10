from datetime import datetime, timezone
from uuid import uuid4

from fastapi import HTTPException, status


users_by_email: dict[str, dict] = {}


def create_user(user_data: dict) -> dict:
    email = user_data["email"]

    if email in users_by_email:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="A user with this email already exists",
        )

    user = {
        "id": str(uuid4()),
        "name": user_data["name"],
        "email": email,
        "hashed_password": user_data["hashed_password"],
        "class_level": user_data["class_level"],
        "target_exam": user_data["target_exam"],
        "created_at": datetime.now(timezone.utc),
        "selected_subject": None,
        "selected_topic": None,
    }
    users_by_email[email] = user
    return user


def get_user_by_email(email: str) -> dict | None:
    return users_by_email.get(email)


def update_student_selection(email: str, subject: str, topic: str) -> dict:
    user = get_user_by_email(email)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    user["selected_subject"] = subject
    user["selected_topic"] = topic
    return user