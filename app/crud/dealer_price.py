from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models import DealerPrice


class CRUDDealerPrice(CRUDBase):

    async def get_dealer_price_id_by_key(
            self,
            key: int,
            session: AsyncSession,
    ) -> Optional[int]:
        db_dealer_price = await session.execute(
            select(DealerPrice.id).where(
                DealerPrice.product_key == key
            )
        )
        return db_dealer_price.scalars().first()


dealer_price_crud = CRUDDealerPrice(DealerPrice)
