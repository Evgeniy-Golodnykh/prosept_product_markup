from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ProductDealerKeyCreate(BaseModel):
    key_id: str
    product_id: Optional[int]


class ProducDealerKeyDB(ProductDealerKeyCreate):
    id: int
    create_date: datetime

    class Config:
        orm_mode = True
