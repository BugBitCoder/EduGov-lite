
from typing import Optional, List
from datetime import datetime
from sqlmodel import Field, SQLModel, Relationship

class UserBase(SQLModel):
    email: str = Field(index=True, unique=True)
    full_name: str
    role: str = Field(default="student")  # student | faculty | admin

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    hashed_password: str

class UserPublic(UserBase):
    id: int

class UserCreate(UserBase):
    password: str

class Token(SQLModel):
    access_token: str
    token_type: str = "bearer"

class AnnouncementBase(SQLModel):
    title: str
    body: str

class Announcement(AnnouncementBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_by: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class AnnouncementRead(AnnouncementBase):
    id: int
    created_by: int
    created_at: datetime

class RequestBase(SQLModel):
    type: str  # leave | event | resource
    description: str
    status: str = Field(default="pending")  # pending | approved | rejected

class Request(RequestBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_by: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class RequestCreate(RequestBase):
    pass

class RequestRead(RequestBase):
    id: int
    created_by: int
    created_at: datetime

class GrievanceBase(SQLModel):
    title: str
    description: str
    status: str = Field(default="open")  # open | in_progress | resolved
    assignee: Optional[int] = Field(default=None, foreign_key="user.id")

class Grievance(GrievanceBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_by: int = Field(foreign_key="user.id")
    created_at: datetime = Field(default_factory=datetime.utcnow)

class GrievanceCreate(GrievanceBase):
    pass

class GrievanceRead(GrievanceBase):
    id: int
    created_by: int
    created_at: datetime
