from typing import List

from pydantic import BaseModel, Json


class RecommendationCreate(BaseModel):
    product_key: str
    product_id: Json[List[int]]
    pred_sim: Json[List[float]]
