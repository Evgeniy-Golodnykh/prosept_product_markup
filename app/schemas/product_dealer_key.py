from datetime import datetime

from pydantic import BaseModel


class ProductDealerKeyCreate(BaseModel):
    key_id: str
    product_id: int


class ProducDealerKeyDB(ProductDealerKeyCreate):
    id: int
    create_date: datetime
    dealer_name: str
    dealer_price_cost: str
    dealer_price_url: str
    dealer_price_name: str
    product_article: str
    product_name: str
    product_cost: str
    product_category: str

    class Config:
        orm_mode = True
