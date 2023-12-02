from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from app.core.db import LONG_LENGTH
from app.models.dealer_price import MarkupStatus


class DealerPriceCreate(BaseModel):
    product_key: int
    price: float = Field(..., gt=0)
    product_url: Optional[str] = Field(..., max_length=LONG_LENGTH)
    product_name: str = Field(..., max_length=LONG_LENGTH)
    date: date
    dealer_id: int
    status: MarkupStatus


class DealerPriceDB(DealerPriceCreate):
    id: int
    price: float
    product_url: Optional[str]
    product_name: str
    date: date
    dealer_id: int
    status: MarkupStatus

    class Config:
        orm_mode = True
