import csv
import logging
from datetime import datetime

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.db import get_async_session
from app.core.logging import configure_logging
from app.crud import dealer_crud, dealer_price_crud, product_crud
from app.models import Dealer, DealerPrice, Product

START_MESSAGE = 'Downloading data from the file {file} has started'
FINISHED_MESSAGE = '{num} objects downloaded from file {file}'
ERROR_MESSAGE = 'Found error {erorr} in line {num} of the data {file}'
RESULT = 'Result'
PATH = 'app/tools/csv/'
DEALER = 'marketing_dealer.csv'
DEALERPRICE = 'marketing_dealerprice.csv'
PRODUCT = 'marketing_product.csv'

configure_logging()
router = APIRouter()


@router.post('/dealers', response_model=dict, status_code=201)
async def load_dealers(session: AsyncSession = Depends(get_async_session)):
    logging.info(START_MESSAGE.format(file=DEALER))
    with open(PATH + DEALER, encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=';')
        next(reader)
        count = 0
        for row in reader:
            try:
                id, name = row
                if await dealer_crud.get_dealer_id_by_name(name, session):
                    continue
                db_object = Dealer(name=name)
                session.add(db_object)
                await session.commit()
                count += 1
            except Exception as error:
                logging.error(
                    ERROR_MESSAGE.format(error=error, num=count, file=DEALER),
                    exc_info=True
                )
        logging.info(FINISHED_MESSAGE.format(num=count, file=DEALER))
    return {RESULT: FINISHED_MESSAGE.format(num=count, file=DEALER)}


@router.post('/dealer_prices', response_model=dict, status_code=201)
async def load_dealer_prices(
    session: AsyncSession = Depends(get_async_session)
):
    with open(PATH + DEALERPRICE, encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=';')
        next(reader)
        count = 0
        for row in reader:
            try:
                (id, product_key, price, product_url,
                 product_name, date, dealer_id) = row
                if await dealer_price_crud.get_dealer_price_by_key(
                    product_key, session
                ):
                    continue
                db_obj = DealerPrice(
                    product_key=product_key,
                    price=price,
                    product_url=product_url,
                    product_name=product_name,
                    date=datetime.strptime(date, '%Y-%m-%d'),
                    dealer_id=int(dealer_id),
                )
                session.add(db_obj)
                await session.commit()
                count += 1
            except Exception as error:
                logging.error(
                    ERROR_MESSAGE.format(
                        error=error,
                        num=count,
                        file=DEALERPRICE
                    ),
                    exc_info=True
                )
        logging.info(FINISHED_MESSAGE.format(num=count, file=DEALERPRICE))
    return {RESULT: FINISHED_MESSAGE.format(num=count, file=DEALERPRICE)}


@router.post('/products', response_model=dict, status_code=201)
async def load_products(session: AsyncSession = Depends(get_async_session)):
    with open(PATH + PRODUCT, encoding='utf-8') as f:
        reader = csv.reader(f, delimiter=';')
        next(reader)
        count = 0
        for row in reader:
            try:
                (num, id, article, ean_13, name, cost, recommended_price,
                 category_id, ozon_name, name_1c, wb_name, ozon_article,
                 wb_article, ym_article, wb_article_td) = row
                if await product_crud.get_product_by_name(name, session):
                    continue
                db_obj = Product(
                    article=article,
                    ean_13=ean_13,
                    name=name,
                    cost=cost,
                    recommended_price=recommended_price,
                    category_id=category_id,
                    ozon_name=ozon_name,
                    name_1c=name_1c,
                    wb_name=wb_name,
                    ozon_article=ozon_article,
                    wb_article=wb_article,
                    wb_article_td=wb_article_td,
                    ym_article=ym_article
                )
                session.add(db_obj)
                await session.commit()
                count += 1
            except Exception as error:
                logging.error(
                    ERROR_MESSAGE.format(error=error, num=count, file=PRODUCT),
                    exc_info=True
                )
        logging.info(FINISHED_MESSAGE.format(num=count, file=PRODUCT))
    return {RESULT: FINISHED_MESSAGE.format(num=count, file=PRODUCT)}
