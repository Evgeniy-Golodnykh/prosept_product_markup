from sqlalchemy import Column, Date, Float, ForeignKey, Integer, String

from app.core.db import LONG_LENGTH, Base


class DealerPrice(Base):
    product_key = Column(Integer, unique=True, nullable=False)
    price = Column(Float, nullable=False)
    product_url = Column(String(LONG_LENGTH))
    product_name = Column(String(LONG_LENGTH), nullable=False)
    date = Column(Date, nullable=False)
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
