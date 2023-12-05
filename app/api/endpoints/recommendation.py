import random

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import check_dealer_price_exists
from app.core.db import get_async_session
from app.crud import product_crud, recommendation_crud
from app.schemas.product import ProductDB
from app.schemas.recommendation import RecommendationCreate

router = APIRouter()


@router.post(
    '/',
    response_model=list[RecommendationCreate],
    status_code=201,
)
async def create_recommendations(
        recommendations: list[RecommendationCreate],
        session: AsyncSession = Depends(get_async_session),
):
    return await recommendation_crud.create_multi(recommendations, session)


@router.post(
    '/{dealer_price_key}',
    response_model=list[ProductDB],
    status_code=201,
)
async def plug(
        dealer_price_key: str,
        session: AsyncSession = Depends(get_async_session),
):
    await check_dealer_price_exists(dealer_price_key, session)
    return [
        await product_crud.get(i, session) for i
        in [random.randint(1, 488) for i in range(5)]
    ]
