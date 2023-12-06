from sqlalchemy import ARRAY, Column, Float, Integer, String

from app.core.db import LONG_LENGTH, Base


class Recommendation(Base):
    product_key = Column(String(LONG_LENGTH), nullable=False)
    product_id = Column(ARRAY(Integer), nullable=False)
    pred_sim = Column(ARRAY(Float), nullable=False)
