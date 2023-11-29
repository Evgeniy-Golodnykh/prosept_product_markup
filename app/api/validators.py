from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.crud import dealer_crud, dealer_price_crud, product_crud

DEALER_EXISTS_ERROR = 'Дилер с таким именем уже существует!'
DEALER_PRICE_NOT_EXISTS_ERROR = 'Товар маркетплейса с ключом "{key}" не найден'
PRODUCT_NOT_EXISTS_ERROR = 'Товар заказчика с id "{id}" не найден'


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
        dealer_price_key: int,
        session: AsyncSession,
) -> None:
    dealer_price_id = await dealer_price_crud.get_dealer_price_id_by_key(
        dealer_price_key, session
    )
    if dealer_price_id is None:
        raise HTTPException(
            status_code=404,
            detail=DEALER_PRICE_NOT_EXISTS_ERROR.format(key=dealer_price_id)
        )


async def check_product_exists(
        product_id: int,
        session: AsyncSession,
) -> None:
    product = await product_crud.get(product_id, session)
    if product is None:
        raise HTTPException(
            status_code=404,
            detail=PRODUCT_NOT_EXISTS_ERROR.format(id=product_id)
        )
