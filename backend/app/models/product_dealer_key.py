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
    product_id = Column(Integer, ForeignKey('product.id'))
    create_date = Column(DateTime, default=datetime.now)
    dealer_name = Column(String)
    dealer_price_cost = Column(String)
    dealer_price_url = Column(String)
    dealer_price_name = Column(String)
    product_article = Column(String)
    product_name = Column(String)
    product_cost = Column(String)
    product_category = Column(String)

    dealer_price = relationship(
        'DealerPrice', back_populates='product_dealer_key'
    )
    product = relationship('Product', back_populates='product_dealer_key')
