from sqlalchemy import Column, String, Date, ForeignKey, Integer, Float
from sqlalchemy.orm import relationship

from app.core.db import Base


class Dealer(Base):
    name = Column(String(100), unique=True, nullable=False)


class DealerPrice(Base):
    product_key = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    product_url = Column(String(5000))
    product_name = Column(String(5000), nullable=False)
    date = Column(Date, nullable=False)
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
