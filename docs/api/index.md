# API

Проект **Areal HR** предоставляет веб-приложение, в котором специалист по кадрам ведет учет сотрудников в нескольких организациях.

## Базовый URL

http://localhost/


## Разделы API

| Раздел           | Ссылка                                   | Назначение                                                 |
|------------------|------------------------------------------|------------------------------------------------------------|
| Organizations    | [organizations.md](./organizations.md)   | Управление организациями                                   |
| Departments      | [departments.md](./departments.md)       | Подразделения внутри организаций                           |
| Positions        | [positions.md](./positions.md)           | Должности сотрудников                                      |
| Employees        | [employees.md](./employees.md)           | Персонал: сотрудники, паспортные данные, адреса, файлы     |
| HR Operations    | [hr-operations.md](./hr-operations.md)   | История кадровых операций                                  |
| Auth & Users     | [auth.md](./auth.md)                     | Аутентификация, текущий пользователь, список пользователей |
| Change History   | [change-history.md](./change-history.md) | История изменений данных (автоматическая)                  |


## HTTP

- `200 OK` — успешный запрос
- `201 Created` — ресурс создан
- `204 No Content` — ресурс удалён
- `400 Bad Request` — ошибка валидации
- `401 Unauthorized` — неавторизованный доступ
- `404 Not Found` — ресурс не найден
- `500 Internal Server Error` — внутренняя ошибка сервера

