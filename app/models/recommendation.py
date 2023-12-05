from sqlalchemy import ARRAY, Column, Float, Integer, String

from app.core.db import SHORT_LENGTH, Base


class Recommendation(Base):
    product_key = Column(String(SHORT_LENGTH), nullable=False)
    product_id = Column(ARRAY(Integer), nullable=False)
    pred_sim = Column(ARRAY(Float), nullable=False)
