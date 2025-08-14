
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session, select
from models import Announcement, AnnouncementBase, AnnouncementRead
from auth import get_session, get_current_user, require_role, User

router = APIRouter()

@router.post("/", response_model=AnnouncementRead)
def create_announcement(payload: AnnouncementBase, session: Session = Depends(get_session), _: User = Depends(require_role("admin", "faculty"))):
    ann = Announcement(**payload.model_dump(), created_by=_.id)
    session.add(ann)
    session.commit()
    session.refresh(ann)
    return ann

@router.get("/", response_model=List[AnnouncementRead])
def list_announcements(session: Session = Depends(get_session)):
    items = session.exec(select(Announcement).order_by(Announcement.created_at.desc())).all()
    return items
