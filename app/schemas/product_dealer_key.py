from pydantic import BaseModel


class ProductDealerKeyCreate(BaseModel):
    key: int
    dealer_id: int
    product_id: int


class ProducDealerKeyDB(ProductDealerKeyCreate):
    id: int

    class Config:
        orm_mode = True
