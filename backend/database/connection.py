import os

from dotenv import load_dotenv
from pymongo import MongoClient
from pymongo.errors import PyMongoError


# Load values from the local .env file.
# This keeps database settings out of the Python code.
load_dotenv()


def get_mongodb_settings():
    """Read MongoDB settings from environment variables."""
    return {
        "mongodb_uri": os.getenv("MONGODB_URI"),
        "database_name": os.getenv("DATABASE_NAME"),
    }


def get_database():
    """Create a MongoDB database connection using values from .env."""
    settings = get_mongodb_settings()
    mongodb_uri = settings["mongodb_uri"]
    database_name = settings["database_name"]

    if not mongodb_uri or not database_name:
        raise RuntimeError(
            "MongoDB settings are missing. Add MONGODB_URI and DATABASE_NAME to your .env file."
        )

    client = MongoClient(mongodb_uri)
    return client[database_name]


def check_database_connection():
    """
    Check whether MongoDB is reachable.

    This is safe to call even if MongoDB is not installed or not running yet.
    It returns a clear response instead of crashing the backend.
    """
    settings = get_mongodb_settings()
    mongodb_uri = settings["mongodb_uri"]
    database_name = settings["database_name"]

    if not mongodb_uri or not database_name:
        return {
            "success": False,
            "message": "MongoDB settings are missing. Add MONGODB_URI and DATABASE_NAME to your .env file.",
        }

    client = None

    try:
        # Keep the timeout short so the status route responds quickly
        # when local MongoDB is not running yet.
        client = MongoClient(mongodb_uri, serverSelectionTimeoutMS=2000)
        client.admin.command("ping")

        return {
            "success": True,
            "message": "MongoDB connection is working",
            "database": database_name,
        }
    except PyMongoError as error:
        return {
            "success": False,
            "message": "MongoDB is not reachable. Make sure local MongoDB is installed and running.",
            "error": str(error),
        }
    finally:
        if client is not None:
            client.close()
