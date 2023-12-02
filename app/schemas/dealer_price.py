from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from app.core.db import LONG_LENGTH, SHORT_LENGTH
from app.models.dealer_price import MarkupStatus


class DealerPriceCreate(BaseModel):
    product_key: str = Field(..., max_length=LONG_LENGTH)
    price: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    product_url: Optional[str] = Field(..., max_length=LONG_LENGTH)
    product_name: str = Field(..., max_length=LONG_LENGTH)
    date: date
    dealer_id: int


class DealerPriceDB(DealerPriceCreate):
    id: int
    status: MarkupStatus

    class Config:
        orm_mode = True
