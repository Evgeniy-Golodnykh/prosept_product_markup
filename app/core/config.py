from typing import Optional

from pydantic import BaseSettings, EmailStr


class Settings(BaseSettings):
    app_title: str = 'Prosept product markup'
    app_description: str = 'Сервис для автоматизации сопоставления товаров'
    database_url: str = 'sqlite+aiosqlite:///./product_markup.db'
    secret: str = 'top_secret'
    first_superuser_email: Optional[EmailStr] = None
    first_superuser_password: Optional[str] = None
    first_superuser_first_name: Optional[str] = None
    first_superuser_last_name: Optional[str] = None

    class Config:
        env_file = '.env'


settings = Settings()
