from typing import List

from pydantic import BaseModel


class RecommendationCreate(BaseModel):
    product_key: str
    product_id: List[int]
    pred_sim: List[float]


class RecommendationDB(RecommendationCreate):

    class Config:
        orm_mode = True
