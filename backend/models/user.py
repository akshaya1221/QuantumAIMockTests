from pydantic import BaseModel, Field


# Data required when a student creates an account.
class UserSignup(BaseModel):
    name: str = Field(..., min_length=2)
    email: str
    password: str = Field(..., min_length=6)
    class_level: str
    target_exam: str


# Data required when a student logs in.
class UserLogin(BaseModel):
    email: str
    password: str
