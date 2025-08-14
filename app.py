
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from db import engine, create_db_and_tables
from routers import auth, users, requests, grievances, announcements

app = FastAPI(title="EduGov Lite API", version="0.1.0")

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(auth.router, prefix="/auth", tags=["auth"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(requests.router, prefix="/requests", tags=["requests"])
app.include_router(grievances.router, prefix="/grievances", tags=["grievances"])
app.include_router(announcements.router, prefix="/announcements", tags=["announcements"])

@app.get("/health")
def health():
    return {"status": "ok"}
