from sqlalchemy import Column, String

from app.core.db import SHORT_LENGTH, Base


class Dealer(Base):
    name = Column(String(SHORT_LENGTH), unique=True, nullable=False)
