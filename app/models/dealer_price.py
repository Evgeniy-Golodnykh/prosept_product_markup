import enum

from sqlalchemy import Column, Date, Enum, Float, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.db import LONG_LENGTH, Base


class MarkupStatus(enum.Enum):
    none = 'Не рассмотрен'
    true = 'Да'
    false = 'Нет'
    delay = 'Отложить'


class DealerPrice(Base):
    product_key = Column(Integer, unique=True, nullable=False)
    price = Column(Float, nullable=False)
    product_url = Column(String(LONG_LENGTH))
    product_name = Column(String(LONG_LENGTH), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(
        Enum(MarkupStatus),
        default=MarkupStatus.none,
        nullable=False
    )
    dealer_id = Column(Integer, ForeignKey('dealer.id'), nullable=False)

    dealer = relationship('Dealer')
