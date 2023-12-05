from sqlalchemy import Column, String
from sqlalchemy.orm import relationship

from app.core.db import LONG_LENGTH, SHORT_LENGTH, Base


class Product(Base):
    article = Column(String(SHORT_LENGTH), nullable=False)
    ean_13 = Column(String(SHORT_LENGTH))
    name = Column(String(LONG_LENGTH), nullable=False)
    cost = Column(String(SHORT_LENGTH))
    recommended_price = Column(String(SHORT_LENGTH))
    category_id = Column(String(SHORT_LENGTH))
    ozon_name = Column(String(LONG_LENGTH))
    name_1c = Column(String(LONG_LENGTH))
    wb_name = Column(String(LONG_LENGTH))
    ozon_article = Column(String(SHORT_LENGTH))
    wb_article = Column(String(SHORT_LENGTH))
    ym_article = Column(String(SHORT_LENGTH))
    wb_article_td = Column(String(SHORT_LENGTH))

    product_dealer_key = relationship(
        'ProductDealerKey', back_populates='product'
    )
