from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from database import Base


class Club(Base):
    __tablename__ = "clubs"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    members = Column(Integer, default=0)


class ClubPost(Base):
    __tablename__ = "club_posts"

    id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("clubs.id", ondelete="CASCADE"))
    content = Column(Text, nullable=False)
    username = Column(String, default="Anonymous")
    created_at = Column(DateTime)


class ClubEvent(Base):
    __tablename__ = "club_events"

    id = Column(Integer, primary_key=True, index=True)
    club_id = Column(Integer, ForeignKey("clubs.id", ondelete="CASCADE"))
    title = Column(String, nullable=False)
    description = Column(Text)
    event_date = Column(DateTime, nullable=False)
    location = Column(String)
    created_by = Column(String, default="Anonymous")
    created_at = Column(DateTime)


class Poll(Base):
    __tablename__ = "polls"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text, nullable=False)
    created_by = Column(String, nullable=False)
    created_at = Column(DateTime)


class PollOption(Base):
    __tablename__ = "poll_options"

    id = Column(Integer, primary_key=True, index=True)
    poll_id = Column(
        Integer,
        ForeignKey("polls.id", ondelete="CASCADE")
    )
    option_text = Column(Text, nullable=False)
    votes = Column(Integer, default=0)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False, index=True)
    email = Column(String, unique=True, nullable=False, index=True)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime)