from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.api.validators import (
    check_dealer_price_exists, check_markup_not_exists, check_product_exists,
)
from app.core.db import get_async_session
from app.crud import dealer_crud, product_dealer_key_crud
from app.schemas.product_dealer_key import (
    ProducDealerKeyDB, ProductDealerKeyCreate,
)

NO_DATA = 'Нет данных'

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
    status_code=201,
)
async def create_markup(
        markup: ProductDealerKeyCreate,
        session: AsyncSession = Depends(get_async_session),
):
    await check_markup_not_exists(markup.key_id, session)
    product = await check_product_exists(markup.product_id, session)
    dealerprice = await check_dealer_price_exists(markup.key_id, session)
    data = markup.dict()
    dealer = await dealer_crud.get(dealerprice.dealer_id, session)
    data['dealer_name'] = dealer.name
    data['dealer_price_cost'] = (
        dealerprice.price if dealerprice.price else NO_DATA
    )
    data['dealer_price_url'] = (
        dealerprice.product_url if dealerprice.product_url else NO_DATA
    )
    data['dealer_price_name'] = dealerprice.product_name
    data['product_article'] = product.article if product.article else NO_DATA
    data['product_name'] = product.name
    data['product_cost'] = product.cost if product.cost else NO_DATA
    data['product_category'] = (
        product.category_id if product.category_id else NO_DATA
    )
    return await product_dealer_key_crud.create(data, session)
