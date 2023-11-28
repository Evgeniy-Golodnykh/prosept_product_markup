from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import product_dealer_key_crud
from app.core.db import get_async_session
from app.schemas.product import ProductDealerKeyCreate, ProducDealerKeyDB


router = APIRouter()


@router.get(
    '/',
    response_model=list[ProducDealerKeyDB],
)
async def get_all_keys(
        session: AsyncSession = Depends(get_async_session),
):
    return await product_dealer_key_crud.get_multi(session)


@router.post(
    '/',
    response_model=ProducDealerKeyDB,
)
async def create_key(
        key: ProductDealerKeyCreate,
        session: AsyncSession = Depends(get_async_session),
):
    return await product_dealer_key_crud.create(key, session)
