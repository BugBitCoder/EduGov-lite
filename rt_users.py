
from fastapi import APIRouter, Depends
from sqlmodel import Session, select
from typing import List
from models import User, UserPublic
from auth import get_session, require_role, get_current_user

router = APIRouter()

@router.get("/me", response_model=UserPublic)
def me(current=Depends(get_current_user)):
    return UserPublic(id=current.id, email=current.email, full_name=current.full_name, role=current.role)

@router.get("/", response_model=List[UserPublic])
def list_users(session: Session = Depends(get_session), _: User = Depends(require_role("admin"))):
    users = session.exec(select(User)).all()
    return [UserPublic(id=u.id, email=u.email, full_name=u.full_name, role=u.role) for u in users]
