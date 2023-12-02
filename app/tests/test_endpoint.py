from fastapi.testclient import TestClient
from http import HTTPStatus
from app.main import app
from app.schemas.dealer import DealerCreate
from app.schemas.dealer_price import DealerPriceCreate
from app.schemas.product import ProductCreate
from app.schemas.product_dealer_key import ProductDealerKeyCreate
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import pytest
from app.models.dealer_price import MarkupStatus

DATABASE_URL = 'sqlite:///./test.db'

engine = create_engine(DATABASE_URL)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def transaction():
    session = TestingSessionLocal()
    session.begin_nested()

    yield

    session.rollback()
    session.close()

def test_get_all_dealers():
    response = client.get('/dealer/')
    assert response.status_code == HTTPStatus.OK

def test_create_dealer():
    dealer = DealerCreate(name='Test1100')
    response = client.post('/dealer/', json=dealer.dict())
    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['name'] == dealer.name

def test_create_duplicate_dealer():
    dealer = DealerCreate(name='Test2100')
    response = client.post('/dealer/', json=dealer.dict())
    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['name'] == dealer.name
    response = client.post('/dealer/', json=dealer.dict())
    assert response.status_code == HTTPStatus.BAD_REQUEST

def test_get_all_dealer_prices():
    response = client.get('/dealerprice/')
    assert response.status_code == HTTPStatus.OK

def test_create_dealer_price():
    dealer_price = DealerPriceCreate(
        product_key=750000,
        price=100.00,
        product_url='https://akson.ru//p/sredstvo_500ml/',
        product_name='Test Product',
        date='2022-01-01',
        status=MarkupStatus.none.value,
        dealer_id=1
    )
    dealer_price_dict = dealer_price.dict()
    dealer_price_dict['date'] = dealer_price_dict['date'].isoformat()
    dealer_price_dict['status'] = dealer_price.status.value
    response = client.post('/dealerprice/', json=dealer_price_dict)
    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['product_key'] == dealer_price.product_key
    assert response.json()['price'] == dealer_price.price
    assert response.json()['product_url'] == dealer_price.product_url
    assert response.json()['product_name'] == dealer_price.product_name
    assert response.json()['date'] == dealer_price_dict['date']
    assert response.json()['status'] == dealer_price.status.value
    assert response.json()['dealer_id'] == dealer_price.dealer_id

def test_get_all_products():
    response = client.get('/product/')
    assert response.status_code == HTTPStatus.OK
    assert response.headers['content-type'] == 'application/json'

def test_create_product():
    product = ProductCreate(
        article='Test Article',
        ean_13=1234567890123.0,
        name='Test Product',
        cost=100.0,
        recommended_price=150.0,
        category_id=1,
        ozon_name='Ozon Test Product',
        name_1c='1C Test Product',
        wb_name='WB Test Product',
        ozon_article=123456,
        wb_article=654321,
        ym_article='YM123',
        wb_article_td='WB123TD',
    )
    response = client.post('/product/', json=product.dict())
    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['article'] == product.article
    assert response.json()['ean_13'] == product.ean_13
    assert response.json()['name'] == product.name
    assert response.json()['cost'] == product.cost
    assert response.json()['recommended_price'] == product.recommended_price
    assert response.json()['category_id'] == product.category_id
    assert response.json()['ozon_name'] == product.ozon_name
    assert response.json()['name_1c'] == product.name_1c
    assert response.json()['wb_name'] == product.wb_name
    assert response.json()['ozon_article'] == product.ozon_article
    assert response.json()['wb_article'] == product.wb_article
    assert response.json()['ym_article'] == product.ym_article
    assert response.json()['wb_article_td'] == product.wb_article_td

def test_get_all_markups():
    response = client.get('/productdealerkey/')
    assert response.status_code == HTTPStatus.OK

def test_create_markup():
    markup = ProductDealerKeyCreate(
        key_id=2322,
        product_id=2,
    )
    response = client.post('/productdealerkey/', json=markup.dict())
    assert response.status_code == HTTPStatus.CREATED
    assert response.json()['key_id'] == markup.key_id
    assert response.json()['product_id'] == markup.product_id
