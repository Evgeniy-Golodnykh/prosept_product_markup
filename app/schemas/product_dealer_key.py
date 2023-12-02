from datetime import datetime

from pydantic import BaseModel


class ProductDealerKeyCreate(BaseModel):
    key_id: int
    product_id: int


class ProducDealerKeyDB(ProductDealerKeyCreate):
    id: int
    create_date: datetime

    class Config:
        orm_mode = True
