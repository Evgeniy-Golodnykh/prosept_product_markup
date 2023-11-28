from fastapi import APIRouter

from app.api.endpoints import user_router, dealer_router, dealer_price_router, product_router, product_dealer_key_router

main_router = APIRouter()
main_router.include_router(user_router)
main_router.include_router(
    dealer_router,
    prefix='/dealer',
    tags=['dealer'],
)
main_router.include_router(
    dealer_price_router,
    prefix='/dealerprice',
    tags=['dealer_price'],
)
main_router.include_router(
    product_router,
    prefix='/product',
    tags=['product'],
)
main_router.include_router(
    product_dealer_key_router,
    prefix='/productdealerkey',
    tags=['product_dealer_key'],
)
