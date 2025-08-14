
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from sqlmodel import Session, select
from models import Request, RequestCreate, RequestRead
from auth import get_session, get_current_user, require_role, User

router = APIRouter()

@router.post("/", response_model=RequestRead)
def create_request(payload: RequestCreate, session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    req = Request(**payload.model_dump(), created_by=user.id)
    session.add(req)
    session.commit()
    session.refresh(req)
    return req

@router.get("/", response_model=List[RequestRead])
def list_my_requests(session: Session = Depends(get_session), user: User = Depends(get_current_user)):
    q = select(Request)
    if user.role != "admin":
        q = q.where(Request.created_by == user.id)
    items = session.exec(q.order_by(Request.created_at.desc())).all()
    return items

@router.patch("/{req_id}/status/{status}", response_model=RequestRead)
def update_status(req_id: int, status: str, session: Session = Depends(get_session), _: User = Depends(require_role("admin", "faculty"))):
    req = session.get(Request, req_id)
    if not req:
        raise HTTPException(404, "Request not found")
    if status not in {"pending", "approved", "rejected"}:
        raise HTTPException(400, "Invalid status")
    req.status = status
    session.add(req)
    session.commit()
    session.refresh(req)
    return req
