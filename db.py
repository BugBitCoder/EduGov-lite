
from sqlmodel import SQLModel, create_engine
import os

DB_URL = os.getenv("DATABASE_URL", "sqlite:///./edugov.db")
connect_args = {"check_same_thread": False} if DB_URL.startswith("sqlite") else {}
engine = create_engine(DB_URL, echo=False, connect_args=connect_args)

def create_db_and_tables():
    from models import User, Request, Grievance, Announcement  # noqa: F401
    SQLModel.metadata.create_all(engine)
