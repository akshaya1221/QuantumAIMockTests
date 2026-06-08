from pydantic import BaseModel


# Data sent when a student chooses what they want to study.
class StudentSelection(BaseModel):
    subject: str
    topic: str
