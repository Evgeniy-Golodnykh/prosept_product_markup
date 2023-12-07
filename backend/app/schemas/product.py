from typing import Optional

from pydantic import BaseModel, Field

from app.core.db import LONG_LENGTH, SHORT_LENGTH


class ProductCreate(BaseModel):
    article: str = Field(..., max_length=SHORT_LENGTH)
    ean_13: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    name: str = Field(..., max_length=LONG_LENGTH)
    cost: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    recommended_price: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    category_id: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    ozon_name: Optional[str] = Field(..., max_length=LONG_LENGTH)
    name_1c: Optional[str] = Field(..., max_length=LONG_LENGTH)
    wb_name: Optional[str] = Field(..., max_length=LONG_LENGTH)
    ozon_article: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    wb_article: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    ym_article: Optional[str] = Field(..., max_length=SHORT_LENGTH)
    wb_article_td: Optional[str] = Field(..., max_length=SHORT_LENGTH)


class ProductDB(ProductCreate):
    id: int

    class Config:
        orm_mode = True
