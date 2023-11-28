from datetime import date
from typing import Optional

from pydantic import BaseModel, Field

from app.core.db import LONG_LENGTH, SHORT_LENGTH


class ProductCreate(BaseModel):
    article: str = Field(..., max_length=LONG_LENGTH)
    ean_13: Optional[float]
    name: Optional[str] = Field(..., max_length=LONG_LENGTH)
    cost: Optional[float]
    recommended_price: Optional[float]
    category_id: Optional[float]
    ozon_name: Optional[str] = Field(..., max_length=LONG_LENGTH)
    name_1c: Optional[str] = Field(..., max_length=LONG_LENGTH)
    wb_name: Optional[str] = Field(..., max_length=LONG_LENGTH)
    ozon_article: Optional[float]
    wb_article: Optional[float]
    ym_article: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    wb_article_td: Optional[str] = Field(..., max_length=SHORT_LENGTH)


class ProductDB(ProductCreate):
    id: int
    article: str
    ean_13: Optional[float]
    name: Optional[str]
    cost: Optional[float]
    recommended_price: Optional[float]
    category_id: Optional[float]
    ozon_name: Optional[str]
    name_1c: Optional[str]
    wb_name: Optional[str]
    ozon_article: Optional[float]
    wb_article: Optional[float]
    ym_article: Optional[str]
    wb_article_td: Optional[str]

    class Config:
        orm_mode = True


class ProductDealerKeyCreate(BaseModel):
    key: int
    dealer_id: int
    product_id: int


class ProducDealerKeyDB(ProductDealerKeyCreate):
    id: int
    key: int
    dealer_id: int
    product_id: int

    class Config:
        orm_mode = True
