from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database.connection import check_database_connection
from routes.ai import router as ai_router
from routes.auth import router as auth_router
from routes.student import router as student_router


# Create the FastAPI application.
# This object is what Uvicorn will run.
app = FastAPI(
    title="Quantum AI IIT JEE Backend",
    description="Phase 1 backend for Quantum AI IIT JEE Mock Tests.",
    version="1.0.0",
)


# Allow frontend apps to connect to this backend during development.
# You can make this stricter later when your frontend URL is finalized.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register authentication routes for signup, login, and current user.
app.include_router(auth_router)

# Register protected student routes for study selections.
app.include_router(student_router)

# Register protected AI tutor routes.
app.include_router(ai_router)


# Basic health check route.
# Open this in the browser to confirm the backend is running.
@app.get("/")
def health_check():
    return {"message": "Quantum AI IIT JEE Backend is running"}


# Phase 2 database status route.
# This route checks MongoDB safely and returns a friendly message.
@app.get("/api/db/status")
def database_status():
    return check_database_connection()
