from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import (
    dealer_crud, dealer_price_crud, product_crud, product_dealer_key_crud,
    recommendation_crud
)
from app.models import DealerPrice, Product, ProductDealerKey, Recommendation

DEALER_EXISTS_ERROR = 'Дилер с таким именем уже существует!'
MARKUP_EXISTS_ERROR = 'Разметка с ключом №{key} уже существует!'
MARKUP_NOT_EXISTS_ERROR = 'Разметка с ключом №{key} не найдена'
DEALER_PRICE_NOT_EXISTS_ERROR = 'Товар маркетплейса с ключом №{key} не найден'
PRODUCT_NOT_EXISTS_ERROR = 'Товар заказчика с id №{id} не найден'
RECOMMENDATION_NOT_EXISTS_ERROR = (
    'Рекомендации для товара с ключом №{key} не найдены'
)


async def check_dealer_name_duplicate(
        name: str,
        session: AsyncSession,
) -> None:
    name_id = await dealer_crud.get_dealer_id_by_name(name, session)
    if name_id is not None:
        raise HTTPException(
            status_code=400,
            detail=DEALER_EXISTS_ERROR,
        )


async def check_dealer_price_exists(
        key: str,
        session: AsyncSession,
) -> DealerPrice:
    dealer_price = await dealer_price_crud.get_dealer_price_by_key(
        key, session
    )
    if dealer_price is None:
        raise HTTPException(
            status_code=404,
            detail=DEALER_PRICE_NOT_EXISTS_ERROR.format(key=key)
        )
    return dealer_price


async def check_product_exists(
        product_id: int,
        session: AsyncSession,
) -> Product:
    product = await product_crud.get(product_id, session)
    if product is None:
        raise HTTPException(
            status_code=404,
            detail=PRODUCT_NOT_EXISTS_ERROR.format(id=product_id)
        )
    return product


async def check_recommendation_exists(
        key: str,
        session: AsyncSession,
) -> Recommendation:
    recommendation = await recommendation_crud.get_recommendation_by_key(
        key, session
    )
    if recommendation is None:
        raise HTTPException(
            status_code=404,
            detail=RECOMMENDATION_NOT_EXISTS_ERROR.format(key=key)
        )
    return recommendation


async def check_markup_exists(
        key: str,
        session: AsyncSession,
) -> ProductDealerKey:
    markup = await product_dealer_key_crud.get_markup_by_key(key, session)
    if markup is None:
        raise HTTPException(
            status_code=404,
            detail=MARKUP_NOT_EXISTS_ERROR.format(key=key)
        )
    return markup


async def check_markup_not_exists(
        key: str,
        session: AsyncSession,
) -> None:
    markup = await product_dealer_key_crud.get_markup_by_key(key, session)
    if markup:
        raise HTTPException(
            status_code=400,
            detail=MARKUP_EXISTS_ERROR.format(key=key)
        )
