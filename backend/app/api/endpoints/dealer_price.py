from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import check_dealer_price_exists
from app.core.db import get_async_session
from app.crud import dealer_price_crud
from app.schemas.dealer_price import (
    DealerPriceCreate, DealerPriceDB, DealerPriceUpdate,
)

router = APIRouter()


@router.get(
    '/',
    response_model=list[DealerPriceDB],
)
async def get_all_dealer_prices(
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_price_crud.get_multi(session)


@router.get(
    '/none_delay_status',
    response_model=list[DealerPriceDB],
)
async def get_all_dealer_prices_none_status(
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_price_crud.get_dealer_prices_none_delay_status(session)


@router.post(
    '/',
    response_model=DealerPriceDB,
    status_code=201,
)
async def create_dealer_price(
        dealer: DealerPriceCreate,
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_price_crud.create(dealer, session)


@router.patch(
    '/{dealer_price_key}',
    response_model=DealerPriceDB,
    status_code=201
)
async def update_dealer_price(
        dealer_price_key: str,
        object: DealerPriceUpdate,
        session: AsyncSession = Depends(get_async_session),
):
    dealer_price = await check_dealer_price_exists(dealer_price_key, session)
    return await dealer_price_crud.update(dealer_price, object, session)
