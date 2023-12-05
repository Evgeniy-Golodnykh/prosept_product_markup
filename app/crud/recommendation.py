from app.crud.base import CRUDBase
from app.models import Recommendation


class CRUDRecommendation(CRUDBase):
    pass


recommendation_crud = CRUDRecommendation(Recommendation)
