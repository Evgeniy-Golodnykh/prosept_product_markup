from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship

from app.core.db import Base


class ProductDealerKey(Base):
    key_id = Column(
        String,
        ForeignKey('dealerprice.product_key'),
        nullable=False,
        unique=True,
    )
    product_id = Column(Integer, ForeignKey('product.id'), default=None)
    create_date = Column(DateTime, default=datetime.now)

    dealer = relationship('DealerPrice')
    product = relationship('Product')
