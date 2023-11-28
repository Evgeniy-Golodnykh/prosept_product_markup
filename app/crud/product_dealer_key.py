from app.crud.base import CRUDBase
from app.models import ProductDealerKey


class CRUDProductDealerKey(CRUDBase):
    pass


product_dealer_key_crud = CRUDProductDealerKey(ProductDealerKey)
