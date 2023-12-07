from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.core.db import SHORT_LENGTH, Base


class Dealer(Base):
    name = Column(String(SHORT_LENGTH), unique=True, nullable=False)

    dealer_price = relationship('DealerPrice', back_populates='dealer')
