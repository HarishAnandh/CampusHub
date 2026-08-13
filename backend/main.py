import hashlib
from jose import jwt, JWTError

from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from datetime import datetime
from database import SessionLocal
from models import (
    Club,
    ClubPost,
    ClubEvent,
    Poll,
    PollOption,
    User
)
app = FastAPI(title="CampusHub API")
# -------------------------
# Authentication config
# -------------------------

SECRET_KEY = "campushub-secret-key-change-this-later"
ALGORITHM = "HS256"
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database session
def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()

def hash_password(password: str):
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def verify_password(plain_password: str, hashed_password: str):
    return hash_password(plain_password) == hashed_password


def create_access_token(username: str):

    payload = {
        "sub": username
    }

    return jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

def get_current_username(
    token: str = Depends(oauth2_scheme)
):
    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        username = payload.get("sub")

        if not username:
            raise HTTPException(
                status_code=401,
                detail="Invalid authentication token"
            )

        return username

    except JWTError:
        raise HTTPException(
            status_code=401,
            detail="Invalid authentication token"
        )

# -------------------------
# Test endpoints
# -------------------------

@app.get("/")
def root():
    return {
        "message": "CampusHub API is running"
    }


@app.get("/api/health")
def health():
    return {
        "status": "ok"
    }


# -------------------------
# Club schema
# -------------------------

class ClubCreate(BaseModel):
    name: str
    description: str | None = None
    category: str | None = None

class PostCreate(BaseModel):
    content: str


class EventCreate(BaseModel):
    title: str
    description: str | None = None
    event_date: datetime
    location: str | None = None

class PollCreate(BaseModel):
    question: str
    options: list[str]


class VoteCreate(BaseModel):
    option_id: int

# -------------------------
# Authentication schemas
# -------------------------

class RegisterRequest(BaseModel):
    username: str
    email: str
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


# -------------------------
# Authentication
# -------------------------

@app.post("/api/auth/register")
def register(
    user: RegisterRequest,
    db: Session = Depends(get_db)
):

    existing_username = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if existing_username:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    existing_email = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_email:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    if len(user.username.strip()) < 3:
        raise HTTPException(
            status_code=400,
            detail="Username must be at least 3 characters"
        )

    if len(user.password) < 6:
        raise HTTPException(
            status_code=400,
            detail="Password must be at least 6 characters"
        )

    new_user = User(
        username=user.username.strip(),
        email=user.email.strip().lower(),
        password_hash=hash_password(user.password),
        created_at=datetime.utcnow()
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "Account created successfully",
        "username": new_user.username
    }
@app.post("/api/auth/login")
def login(
    user: LoginRequest,
    db: Session = Depends(get_db)
):

    existing_user = (
        db.query(User)
        .filter(User.username == user.username)
        .first()
    )

    if not existing_user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    if not verify_password(
        user.password,
        existing_user.password_hash
    ):

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password"
        )

    token = create_access_token(
        existing_user.username
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": existing_user.username
    }
# -------------------------
# Get all clubs
# -------------------------

@app.get("/api/clubs")
def get_clubs(db: Session = Depends(get_db)):

    clubs = db.query(Club).all()

    return clubs


# -------------------------
# Create club
# -------------------------

@app.post("/api/clubs")
def create_club(
    club: ClubCreate,
    db: Session = Depends(get_db)
):

    new_club = Club(
        name=club.name,
        description=club.description,
        category=club.category,
        members=0
    )

    db.add(new_club)
    db.commit()
    db.refresh(new_club)

    return new_club


# -------------------------
# Get single club
# -------------------------

@app.get("/api/clubs/{club_id}")
def get_club(
    club_id: int,
    db: Session = Depends(get_db)
):

    club = db.query(Club).filter(Club.id == club_id).first()

    if not club:
        raise HTTPException(
            status_code=404,
            detail="Club not found"
        )

    return club

# -------------------------
# Club Posts
# -------------------------

@app.get("/api/clubs/{club_id}/posts")
def get_club_posts(
    club_id: int,
    db: Session = Depends(get_db)
):
    posts = (
        db.query(ClubPost)
        .filter(ClubPost.club_id == club_id)
        .order_by(ClubPost.created_at.desc())
        .all()
    )

    return posts


@app.post("/api/clubs/{club_id}/posts")
def create_club_post(
    club_id: int,
    post: PostCreate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_username)
):
    club = (
        db.query(Club)
        .filter(Club.id == club_id)
        .first()
    )

    if not club:
        raise HTTPException(
            status_code=404,
            detail="Club not found"
        )

    new_post = ClubPost(
        club_id=club_id,
        content=post.content,
        username=username,
        created_at=datetime.utcnow()
    )

    db.add(new_post)
    db.commit()
    db.refresh(new_post)

    return new_post
# -------------------------
# Club Events
# -------------------------

@app.get("/api/clubs/{club_id}/events")
def get_club_events(
    club_id: int,
    db: Session = Depends(get_db)
):
    events = (
        db.query(ClubEvent)
        .filter(ClubEvent.club_id == club_id)
        .order_by(ClubEvent.event_date.asc())
        .all()
    )

    return events


@app.post("/api/clubs/{club_id}/events")
def create_club_event(
    club_id: int,
    event: EventCreate,
    db: Session = Depends(get_db),
    username: str = Depends(get_current_username)
):
    club = (
        db.query(Club)
        .filter(Club.id == club_id)
        .first()
    )

    if not club:
        raise HTTPException(
            status_code=404,
            detail="Club not found"
        )

    new_event = ClubEvent(
        club_id=club_id,
        title=event.title,
        description=event.description,
        event_date=event.event_date,
        location=event.location,
        created_by=username,
        created_at=datetime.utcnow()
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event

# -------------------------
# Polls
# -------------------------

@app.get("/api/polls")
def get_polls(db: Session = Depends(get_db)):

    polls = (
        db.query(Poll)
        .order_by(Poll.created_at.desc())
        .all()
    )

    result = []

    for poll in polls:

        options = (
            db.query(PollOption)
            .filter(PollOption.poll_id == poll.id)
            .all()
        )

        result.append({
            "id": poll.id,
            "question": poll.question,
            "created_at": poll.created_at,
            "options": [
                {
                    "id": option.id,
                    "option_text": option.option_text,
                    "votes": option.votes
                }
                for option in options
            ]
        })

    return result

@app.post("/api/polls")
def create_poll(
    poll: PollCreate,
    db: Session = Depends(get_db)
):

    if len(poll.options) < 2:
        raise HTTPException(
            status_code=400,
            detail="A poll needs at least two options."
        )

    new_poll = Poll(
        question=poll.question,
        created_at=datetime.utcnow()
    )

    db.add(new_poll)
    db.commit()
    db.refresh(new_poll)

    for option in poll.options:

        if option.strip():

            new_option = PollOption(
                poll_id=new_poll.id,
                option_text=option.strip(),
                votes=0
            )

            db.add(new_option)

    db.commit()

    return {
        "message": "Poll created successfully",
        "poll_id": new_poll.id
    }

@app.post("/api/polls/{poll_id}/vote")
def vote_poll(
    poll_id: int,
    vote: VoteCreate,
    db: Session = Depends(get_db)
):

    poll = (
        db.query(Poll)
        .filter(Poll.id == poll_id)
        .first()
    )

    if not poll:
        raise HTTPException(
            status_code=404,
            detail="Poll not found"
        )

    option = (
        db.query(PollOption)
        .filter(
            PollOption.id == vote.option_id,
            PollOption.poll_id == poll_id
        )
        .first()
    )

    if not option:
        raise HTTPException(
            status_code=404,
            detail="Poll option not found"
        )

    option.votes += 1

    db.commit()

    return {
        "message": "Vote submitted successfully"
    }

