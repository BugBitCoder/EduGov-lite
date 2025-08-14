
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from models import User, UserCreate, UserPublic, Token
from auth import get_session, get_password_hash, verify_password, create_access_token

router = APIRouter()

@router.post("/register", response_model=UserPublic)
def register(user_in: UserCreate, session: Session = Depends(get_session)):
    existing = session.exec(select(User).where(User.email == user_in.email)).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = User(email=user_in.email, full_name=user_in.full_name, role=user_in.role, hashed_password=get_password_hash(user_in.password))
    session.add(user)
    session.commit()
    session.refresh(user)
    return UserPublic(id=user.id, email=user.email, full_name=user.full_name, role=user.role)

@router.post("/token", response_model=Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), session: Session = Depends(get_session)):
    user = session.exec(select(User).where(User.email == form_data.username)).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    token = create_access_token({"sub": str(user.id), "role": user.role})
    return Token(access_token=token)
