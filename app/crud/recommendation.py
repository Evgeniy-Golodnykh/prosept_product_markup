from typing import Optional

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models import Recommendation


class CRUDRecommendation(CRUDBase):

    async def get_recommendation_by_key(
            self,
            key: str,
            session: AsyncSession,
    ) -> Optional[Recommendation]:
        db_recommendation = await session.execute(
            select(Recommendation).where(
                Recommendation.product_key == key
            ).order_by(desk(Recommendation.id))
        )
        return db_recommendation.scalars().first()


recommendation_crud = CRUDRecommendation(Recommendation)
