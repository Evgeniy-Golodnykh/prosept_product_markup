from sqlalchemy import Column, String, Date, ForeignKey, Integer, Float

from app.core.db import Base, LONG_LENGTH, SHORT_LENGTH


class Dealer(Base):
    name = Column(String(SHORT_LENGTH), unique=True, nullable=False)


class DealerPrice(Base):
    product_key = Column(Integer, unique=True, nullable=False)
    price = Column(Float, nullable=False)
    product_url = Column(String(LONG_LENGTH))
    product_name = Column(String(LONG_LENGTH), nullable=False)
    date = Column(Date, nullable=False)
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
