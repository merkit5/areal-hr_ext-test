# Учет сотрудников в организациях

Веб-приложение для учета сотрудников в нескольких организациях.

## Инструменты

### Среда разработки (IDE)
WebStorm

### Операционная система
Ubuntu Desktop 24.04 

### База данных
PostgreSQL 17

Для данного проекта выбран способ установки PostgreSQL 17 в операционную систему, потому что:

1. Установка напрямую в операционную систему обеспечивает максимальную производительность, так как отсутствуют расходы на виртуализацию.
2. При установке в ОС проще контролировать настройки безопасности и доступ к данным.
3. Для production-окружения рекомендуется устанавливать PostgreSQL непосредственно в операционную систему, что необходимо для выполнения задания со *.


## Работа с системой контроля версий Git

### Настройка Git

- git config --global user.name "John Doe"
- git config --global user.name "John Doe" git config --global user.email johndoe@example.com

### Основные команды Git

- git init - Инициализирует новый репозиторий
- git clone - Клонирует удаленный репозиторий
- git status - Показывает состояние репозитория
- git add <file> - Добавляет файл в индекс (git add . - Добавляет все измененные файлы в индекс)
- git commit -m "" - Коммит
- git push origin <branch> - Отправляет изменения
- git pull origin <branch> - Получает изменения
- git branch <name> - Создает новую ветку
- git checkout <branch> - Переключается на ветку
- git merge <branch> - Объединяет изменения
- git merge --abort - Отменяет слияние


