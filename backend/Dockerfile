FROM python:3.11-slim
WORKDIR /project
COPY requirements.txt .
RUN python -m pip install --upgrade pip
RUN pip3 install -r requirements.txt --no-cache-dir
COPY app app
COPY alembic alembic
COPY alembic.ini .