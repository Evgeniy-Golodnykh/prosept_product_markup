from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models import Dealer


class CRUDDealer(CRUDBase):

    async def get_dealer_id_by_name(
            self,
            name: str,
            session: AsyncSession,
    ) -> Optional[int]:
        db_dealer_price = await session.execute(
            select(Dealer.id).where(Dealer.name == name)
        )
        return db_dealer_price.scalars().first()


dealer_crud = CRUDDealer(Dealer)
