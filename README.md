# Prosept Product Markup

### Description
Manufacturer and marketplace product matching app

### Quick Start backend
1. Clone repo
```bash
git git@github.com:Evgeniy-Golodnykh/prosept_product_markup.git
```
2. Creates a virtual environment
```bash
python3 -m venv venv
```
3. Activates the virtual environment
```bash
source venv/bin/activate
```
4. Go to backend folder
```bash
cd backend
```
5. Upgrade PIP and installs the requirements package into the virtual environment
```bash
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```
6. Configure the .env file like this
```bash
APP_TITLE=Prosept product markup
APP_DESCRIPTION=Сервис для автоматизации сопоставления товаров
SECRET=top_secret
FIRST_SUPERUSER_EMAIL=admin@gmail.com
FIRST_SUPERUSER_PASSWORD=secret_password
FIRST_SUPERUSER_FIRST_NAME=some_name
FIRST_SUPERUSER_LAST_NAME=some_lastname
MATCHING_COUNT=5
DATABASE_URL=postgresql+asyncpg://postgres:postgres@db:5432/prosept
```
7. To create database (only PostgreSQL) use command
```bash
alembic upgrade head
```
8. To run the application use command
```bash
uvicorn app.main:app --reload
```

### Swagger: API Documentation
http://127.0.0.1:8000/docs/

### Authors
Backend:
- [Evgeniy Golodnykh](https://github.com/Evgeniy-Golodnykh)

Backend Unit Testing:
- [Alexandra Nikitenko](https://github.com/Aleksandri-A)

Frontend:
- [Evgeniy Koltyapin](https://github.com/kotbegemot1)
- [Danila Shnayder](https://github.com/Shnd3r)

Data Science:
- [Aleksandr Glazunov](https://github.com/pzae)
- [Milana Gakaeva](https://t.me/m_gakaeva)
- [Renata Piatkova](https://t.me/renata_piatkova)

### CI/CD pipeline status
[![Prosept product markup workflow](https://github.com/Evgeniy-Golodnykh/prosept_product_markup/actions/workflows/prosept_product_markup_workflow.yml/badge.svg)](https://github.com/Evgeniy-Golodnykh/prosept_product_markup/actions/workflows/prosept_product_markup_workflow.yml)
