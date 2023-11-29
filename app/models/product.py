from sqlalchemy import Column, Float, String

from app.core.db import LONG_LENGTH, SHORT_LENGTH, Base


class Product(Base):
    article = Column(String(SHORT_LENGTH), nullable=False)
    ean_13 = Column(Float)
    name = Column(String(LONG_LENGTH))
    cost = Column(Float)
    recommended_price = Column(Float)
    category_id = Column(Float)
    ozon_name = Column(String(LONG_LENGTH))
    name_1c = Column(String(LONG_LENGTH))
    wb_name = Column(String(LONG_LENGTH))
    ozon_article = Column(Float)
    wb_article = Column(Float)
    ym_article = Column(String(SHORT_LENGTH))
    wb_article_td = Column(String(SHORT_LENGTH))
