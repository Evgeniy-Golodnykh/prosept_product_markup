from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import product_crud
from app.core.db import get_async_session
from app.schemas.product import ProductCreate, ProductDB


router = APIRouter()


@router.get(
    '/',
    response_model=list[ProductDB],
)
async def get_all_products(
        session: AsyncSession = Depends(get_async_session),
):
    return await product_crud.get_multi(session)


@router.post(
    '/',
    response_model=ProductDB,
)
async def create_product(
        product: ProductCreate,
        session: AsyncSession = Depends(get_async_session),
):
    return await product_crud.create(product, session)
