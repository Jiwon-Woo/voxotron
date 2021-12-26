FROM python:3

WORKDIR /home/voxotron


# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN pip install --upgrade pip setuptools
COPY ./requirements.txt .
RUN pip install -r requirements.txt
COPY . .
