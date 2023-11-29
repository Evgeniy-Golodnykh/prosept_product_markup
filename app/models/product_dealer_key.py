from sqlalchemy import Column, ForeignKey, Integer

from app.core.db import Base


class ProductDealerKey(Base):
    key = Column(Integer, ForeignKey('dealerprice.product_key'))
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
    product_id = Column(Integer, ForeignKey('product.id'))
