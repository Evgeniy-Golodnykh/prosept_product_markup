# Prosept Product Markup

### Description
Manufacturer and marketplace product matching app

### Quick Start
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
4. Upgrade PIP and installs the requirements package into the virtual environment
```bash
python3 -m pip install --upgrade pip
python3 -m pip install -r requirements.txt
```
5. Configure the .env file like this
```bash
APP_TITLE=Prosept product markup
APP_DESCRIPTION=Сервис для автоматизации сопоставления товаров
DATABASE_URL=sqlite+aiosqlite:///./product_markup.db
SECRET=top_secret
FIRST_SUPERUSER_EMAIL=admin@gmail.com
FIRST_SUPERUSER_PASSWORD=admin
```
6. To create database use command
```bash
alembic upgrade head
```
7. To run the application use command
```bash
uvicorn app.main:app --reload
```