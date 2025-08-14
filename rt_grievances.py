
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session, select
from models import Grievance, GrievanceCreate, GrievanceRead
from auth import get_session, get_current_user, require_role, User

router = APIRouter()

@router.post("/", response_model=GrievanceRead)
def create_grievance(payload: GrievanceCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    g = Grievance(**payload.model_dump(), created_by=user.id)
    session.add(g)
    session.commit()
    session.refresh(g)
    return g

@router.get("/", response_model=List[GrievanceRead])
def list_grievances(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    q = select(Grievance)
    if user.role != "admin":
        q = q.where(Grievance.created_by == user.id)
    items = session.exec(q.order_by(Grievance.created_at.desc())).all()
    return items

@router.patch("/{g_id}/assign/{assignee_id}", response_model=GrievanceRead)
def assign_grievance(g_id: int, assignee_id: int, session: Session = Depends(get_session), _: User = Depends(require_role("admin", "faculty"))):
    g = session.get(Grievance, g_id)
    if not g:
        raise HTTPException(404, "Grievance not found")
    g.assignee = assignee_id
    session.add(g)
    session.commit()
    session.refresh(g)
    return g

@router.patch("/{g_id}/status/{status}", response_model=GrievanceRead)
def update_status(g_id: int, status: str, session: Session = Depends(get_session), _: User = Depends(require_role("admin", "faculty"))):
    g = session.get(Grievance, g_id)
    if not g:
        raise HTTPException(404, "Grievance not found")
    if status not in {"open", "in_progress", "resolved"}:
        raise HTTPException(400, "Invalid status")
    g.status = status
    session.add(g)
    session.commit()
    session.refresh(g)
    return g
