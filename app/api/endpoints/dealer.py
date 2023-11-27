from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud.base import dealer_crud
from app.core.db import get_async_session
from app.schemas.dealer import DealerCreate, DealerDB


router = APIRouter()


@router.get(
    '/',
    response_model=list[DealerDB],
)
async def get_all_dealers(
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_crud.get_multi(session)


@router.post(
    '/',
    response_model=DealerDB,
)
async def create_dealer(
        dealer: DealerCreate,
        session: AsyncSession = Depends(get_async_session),
):
    return await dealer_crud.create(dealer, session)
