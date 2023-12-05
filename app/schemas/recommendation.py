from pydantic import BaseModel


class RecommendationCreate(BaseModel):
    product_key: str
    product_id: list[int]
    pred_sim: list[float]
