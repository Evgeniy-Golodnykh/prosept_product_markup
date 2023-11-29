from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import check_dealer_price_exists, check_product_exists
from app.core.db import get_async_session
from app.crud import product_dealer_key_crud
from app.schemas.product_dealer_key import (
    ProducDealerKeyDB, ProductDealerKeyCreate,
)

router = APIRouter()


@router.get(
    '/',
    response_model=list[ProducDealerKeyDB],
)
async def get_all_markups(
        session: AsyncSession = Depends(get_async_session),
):
    return await product_dealer_key_crud.get_multi(session)


@router.post(
    '/',
    response_model=ProducDealerKeyDB,
)
async def create_markup(
        markup: ProductDealerKeyCreate,
        session: AsyncSession = Depends(get_async_session),
):
    await check_product_exists(markup.product_id, session)
    await check_dealer_price_exists(markup.key_id, session)
    return await product_dealer_key_crud.create(markup, session)
