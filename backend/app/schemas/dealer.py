from pydantic import BaseModel, Field

from app.core.db import SHORT_LENGTH


class DealerCreate(BaseModel):
    name: str = Field(..., max_length=SHORT_LENGTH)


class DealerDB(DealerCreate):
    id: int
    name: str

    class Config:
        orm_mode = True
