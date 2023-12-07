from typing import Optional

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import CRUDBase
from app.models import Product


class CRUDProduct(CRUDBase):

    async def get_product_by_name(
            self,
            name: str,
            session: AsyncSession,
    ) -> Optional[Product]:
        db_product = await session.execute(
            select(Product).where(Product.name == name)
        )
        return db_product.scalars().first()


product_crud = CRUDProduct(Product)
