import enum

from sqlalchemy import Column, Date, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.db import LONG_LENGTH, SHORT_LENGTH, Base


class MarkupStatus(enum.Enum):
    none = 'Не рассмотрен'
    true = 'Да'
    false = 'Нет'
    delay = 'Отложить'


class DealerPrice(Base):
    product_key = Column(String(LONG_LENGTH), nullable=False, unique=True)
    price = Column(String(SHORT_LENGTH))
    product_url = Column(String(LONG_LENGTH))
    product_name = Column(String(LONG_LENGTH), nullable=False)
    date = Column(Date, nullable=False)
    status = Column(
        Enum(MarkupStatus),
        default=MarkupStatus.none,
        nullable=False
    )
    dealer_id = Column(Integer, ForeignKey('dealer.id'), nullable=False)

    dealer = relationship('Dealer', back_populates='dealer_price')
    product_dealer_key = relationship(
        'ProductDealerKey', back_populates='dealer_price'
    )
