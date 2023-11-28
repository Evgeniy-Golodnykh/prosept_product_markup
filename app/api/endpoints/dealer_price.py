from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.crud import dealer_price_crud
from app.schemas.dealer_price import DealerPriceCreate, DealerPriceDB

router = APIRouter()


@router.get(
    '/',
    response_model=list[DealerPriceDB],
)
async def get_all_dealer_prices(
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_price_crud.get_multi(session)


@router.post(
    '/',
    response_model=DealerPriceDB,
)
async def create_dealer_price(
        dealer: DealerPriceCreate,
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_price_crud.create(dealer, session)
