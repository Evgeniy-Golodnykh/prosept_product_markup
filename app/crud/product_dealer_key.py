from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models import ProductDealerKey


class CRUDProductDealerKey(CRUDBase):

    async def create(
            self,
            object_data,
            session: AsyncSession,
    ):
        db_object = self.model(**object_data)
        session.add(db_object)
        await session.commit()
        await session.refresh(db_object)
        return db_object

    async def get_markup_by_key(
            self,
            key: str,
            session: AsyncSession,
    ) -> Optional[ProductDealerKey]:
        db_dealer_price = await session.execute(
            select(ProductDealerKey).where(
                ProductDealerKey.key_id == key
            )
        )
        return db_dealer_price.scalars().first()


product_dealer_key_crud = CRUDProductDealerKey(ProductDealerKey)
