from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import (
    check_dealer_price_exists, check_recommendation_exists,
)
from app.core.db import get_async_session
from app.crud import product_crud, recommendation_crud
from app.schemas.product import ProductDB
from app.schemas.recommendation import RecommendationCreate, RecommendationDB

FINISHED_MESSAGE = 'ML data has been successfully uploaded to the database'

router = APIRouter()


@router.get(
    '/',
    response_model=list[RecommendationDB],
)
async def get_all_recommendations(
        session: AsyncSession = Depends(get_async_session),
):
    return await recommendation_crud.get_multi(session)


@router.post(
    '/',
    response_model=dict,
    status_code=201,
)
async def create_recommendations(
        recommendations: list[RecommendationCreate],
        session: AsyncSession = Depends(get_async_session),
):
    await recommendation_crud.create_multi(recommendations, session)
    return {'Result': FINISHED_MESSAGE}


@router.post(
    '/{dealer_price_key}',
    response_model=list[ProductDB],
    status_code=201,
)
async def get_some_recommendations(
        dealer_price_key: str,
        session: AsyncSession = Depends(get_async_session),
):
    await check_dealer_price_exists(dealer_price_key, session)
    recommendations = await check_recommendation_exists(
        dealer_price_key, session
    )
    return [
        await product_crud.get(recommendation, session)
        for recommendation in recommendations.product_id
    ]
