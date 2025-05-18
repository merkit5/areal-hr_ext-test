# Установка Areal HR System

## Требования
Vue.js (3.5)
Node.JS (22)
PostgreSQL 17
Docker / Docker Compose

## Быстрый старт

1. Клонируйте репозиторий:
```bash
    git clone https://github.com/merkit5/areal-hr_ext-test.git
    cd areal-hr_ext-test
```
2.Настройте окружение (скопируйте и отредактируйте):
```bash
  cp .env.example .env
  nano .env 
```
3.Запустите систему:
```bash
    docker-compose up -d
```

Система автоматически:

    Развернет PostgreSQL
    
    Накатит все миграции базы данных
    
    Запустит backend API и frontend

Доступные адреса:

🖥️ Frontend: http://localhost

[API Документация](/api)

🐘 PostgreSQL: localhost:5433