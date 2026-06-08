from pydantic import BaseModel, Field


# Question sent by a logged-in student to the AI tutor.
class AITutorRequest(BaseModel):
    question: str = Field(..., min_length=1)
    subject: str | None = None
    topic: str | None = None
