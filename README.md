UNI Shop Backend

Серверная часть проекта конструктора интернет-магазинов, аналогичного Shopify. Реализует управление пользователями, товарами, категориями, брендами, страницами магазина, публичное API, а также mock-интеграцию платежей. Проект выполнен как учебный.

Технологии
Node.js (TypeScript)
Express
PostgreSQL
Prisma ORM
JWT (аутентификация и авторизация)
REST API
Реализованные модули по спринтам

Спринт 1
Регистрация и авторизация пользователей
JWT-аутентификация и контроль ролей
Роли: user и admin
Администрирование пользователей (просмотр и изменение роли)
Подключение PostgreSQL и Prisma
Настройка конфигурации через .env

Спринт 2
Управление брендами (CRUD)
Управление категориями (CRUD + дерево категорий)
Управление товарами (CRUD + soft delete)
Mock-загрузка изображений (endpoint без реального хранилища)

Спринт 3
Управление страницами магазина (JSON-структура, CRUD, публикация)
Система шаблонов (хранение шаблонов и их выдача)
Публичное API для рендеринга магазина

Спринт 4
Заказы и OrderItems (CRUD)
Mock-платежи (создание платежного намерения с client_secret)
Публичный вывод данных по магазину

Структура проекта
src/
 ├─ config/
 ├─ middleware/
 ├─ modules/
 │   ├─ auth/
 │   ├─ users/
 │   ├─ brands/
 │   ├─ categories/
 │   ├─ products/
 │   ├─ pages/
 │   ├─ templates/
 │   ├─ orders/
 │   ├─ payments/
 │   └─ public/
 ├─ uploads/
 ├─ app.ts
 └─ server.ts

Запуск проекта
1. Установка зависимостей
npm install

2. Файл окружения .env
Необходимо создать .env или использовать .env.example.

Пример:
DATABASE_URL="postgresql://postgres:password@localhost:5432/uni_shop?schema=public"
JWT_SECRET="secret"
PORT=4000

3. Настройка PostgreSQL
Проект ожидает базу данных:
host: localhost
port: 5432
database: uni_shop

4. Применение миграций Prisma
npx prisma migrate dev

5. Генерация Prisma Client
npx prisma generate

6. Запуск сервера
npm run dev

По умолчанию сервер доступен на: http://localhost:4000

Аутентификация
Аутентификация осуществляется через JWT.

Точки входа:
POST /api/auth/register
POST /api/auth/login

Передача токена:
Authorization: Bearer <token>

Основные API-модули
Пользователи (администрирование)
GET /api/admin/users
PUT /api/admin/users/:id

Бренды
GET /api/brands
POST /api/brands
PUT /api/brands/:id
DELETE /api/brands/:id

Категории
GET /api/categories
GET /api/categories/tree
POST /api/categories
PUT /api/categories/:id
DELETE /api/categories/:id

Товары
GET /api/products
POST /api/products
PUT /api/products/:id
DELETE /api/products/:id   (soft delete)

Страницы магазина
GET /api/pages
POST /api/pages
PUT /api/pages/:id
POST /api/pages/:id/publish

Шаблоны
GET /api/templates

Заказы
GET /api/orders
POST /api/orders
PUT /api/orders/:id

Платежи (mock)
POST /api/payments/create-intent

Ответ:
{ "client_secret": "mock_client_secret_<id>" }

Публичное API
GET /api/public/store/:userId
GET /api/public/products?storeId=...

Загрузка файлов

Проект содержит mock-endpoint для загрузки файлов:
POST /api/uploads


Ответ:
{ "message": "Upload endpoint works (stub)" }

Конфигурация Git
Файл .gitignore должен содержать:
node_modules
.env
dist

Файл .env.example должен быть включен в репозиторий.
