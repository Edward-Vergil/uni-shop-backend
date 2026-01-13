Uni-Shop Backend

Uni-Shop Backend — серверная часть учебного проекта интернет-магазина. В основе используется стек: Node.js, TypeScript, Express, Prisma ORM и база данных PostgreSQL.

Описание функциональности
1. Аутентификация и авторизация

Реализована регистрация и вход пользователей с использованием JWT-токенов. Поддерживается проверка прав доступа.

Функции:

Регистрация нового пользователя: POST /api/auth/register

Вход и получение JWT-токена: POST /api/auth/login

Middleware-проверка токена для защищенных маршрутов

Роли пользователей: USER и ADMIN

2. Управление пользователями (административная панель)

Маршруты доступны только пользователям с ролью ADMIN.

Функции:

Получение списка пользователей с пагинацией: GET /api/admin/users

Изменение роли пользователя: PUT /api/admin/users/{id}

3. Бренды

Поддерживается полный CRUD для производителей товаров.

Функции:

Получение списка брендов: GET /api/brands

Создание нового бренда: POST /api/brands

Изменение бренда: PUT /api/brands/{id}

Удаление бренда: DELETE /api/brands/{id}

Загрузка логотипов производителей

4. Категории каталога

Реализованы операции с категориями, включая дерево категорий.

Функции:

CRUD для категорий: GET, POST, PUT, DELETE /api/categories

Получение дерева категорий: GET /api/categories/tree

5. Товары

Реализованы операции с товарами, поддерживается загрузка изображений и мягкое удаление.

Функции:

Получение списка товаров: GET /api/products

Создание нового товара: POST /api/products

Изменение товара: PUT /api/products/{id}

Мягкое удаление товара: DELETE /api/products/{id}

Загрузка одного или нескольких изображений

Используемые технологии
Технология	Назначение
Node.js	Серверная платформа
TypeScript	Статическая типизация
Express	Web-фреймворк
Prisma	ORM для работы с PostgreSQL
PostgreSQL	Реляционная база данных
JWT (JSON Web Token)	Авторизация
Multer	Загрузка файлов

Инструкция по запуску
1. Клонирование проекта
git clone https://github.com/Edward-Vergil/uni-shop-backend.git
cd uni-shop-backend
npm install

2. Создание файла окружения .env

Создать файл .env и указать следующие переменные:

DATABASE_URL="postgresql://postgres:your_password@localhost:5432/uni_shop"
JWT_SECRET="your_secret_key"
PORT=4000

3. Миграции базы данных
npx prisma migrate dev

4. Запуск проекта
npm run dev
