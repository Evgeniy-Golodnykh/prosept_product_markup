from fastapi import APIRouter

from app.api.endpoints import user_router, dealer_router, dealer_price_router

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
