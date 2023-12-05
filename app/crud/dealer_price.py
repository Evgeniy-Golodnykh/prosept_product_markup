from typing import Optional

from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models.dealer_price import DealerPrice, MarkupStatus


class CRUDDealerPrice(CRUDBase):

    async def get_dealer_price_by_key(
            self,
            key: str,
            session: AsyncSession,
    ) -> Optional[DealerPrice]:
        db_dealer_price = await session.execute(
            select(DealerPrice).where(
                DealerPrice.product_key == key
            )
        )
        return db_dealer_price.scalars().first()

    async def get_dealer_prices_none_status(
            self,
            session: AsyncSession,
    ) -> list[DealerPrice]:
        db_dealer_prices = await session.execute(
            select(DealerPrice).where(or_(
                DealerPrice.status == MarkupStatus.none,
                DealerPrice.status == MarkupStatus.delay,
            ))
        )
        return db_dealer_prices.scalars().all()


dealer_price_crud = CRUDDealerPrice(DealerPrice)
