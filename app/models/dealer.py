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


class Product(Base):
    id = Column(Integer, primary_key=True)
    article = Column(String(5000), nullable=False)
    ean_13 = Column(Float)
    name = Column(String(5000))
    cost = Column(Float, nullable=False)
    recommended_price = Column(Float)
    category_id = Column(Float)
    ozon_name = Column(String(5000))
    name_1c = Column(String(5000))
    wb_name = Column(String(5000))
    ozon_article = Column(Float)
    wb_article = Column(Float)
    ym_article = Column(String(100))
    wb_article_td = Column(String(100))


class ProductDealerKey(Base):
    key = Column(Integer, nullable=False)
    dealer_id = Column(Integer, ForeignKey('dealer.id'))
    product_id = Column(Integer, ForeignKey('product.id'))


