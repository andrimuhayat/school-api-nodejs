# School API
### Version: 1.0.0
Teachers need a system where they can perform administrative functions for their students. Teachers and students are identified by their email addresses.

## Code Architecture
This service follows a clean separation of concerns based on [Uncle Bob's Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/The-Clean-Architecture.html).

## Built With
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Knex.js](https://knexjs.org/)
- [MySQL](https://www.mysql.com/)
- [Jest](https://jestjs.io/)
- [Docker](https://www.docker.com/)
- [ESLint](https://eslint.org/)

## Dependency Rule
Following Clean Architecture principles, the service is structured into the following layers:
- **Use Cases**: Implements business rules and orchestrates workflows.
- **Interface Adapters**:
    - **Repository Interface**: Bridges database interactions.
    - **Use Case Interface**: Connects handlers with business logic.
- **Frameworks and Drivers**:
    - **Handler Layer**: Handles HTTP requests.
    - **Repository Implementation**: Implements database operations using Knex.js.

## Standardization
- Code formatting follows [ESLint + Prettier](https://eslint.org/)
- API resource naming follows [RESTful API Naming Guidelines](https://restfulapi.net/resource-naming/)
- Automated testing with Jest

## Environment Variables
**note: This is for development only!**

The backend environment is configured using a `.env` file:

```env
DB_HOST=host.docker.internal
DB_PORT=7001
DB_NAME=school_db
DB_USER=user
DB_PASS=bc09s
PORT=3000
TZ=Asia/Jakarta
```

## Database Migrations
This project uses Knex for database migrations. Migration scripts should be placed in the `migrations` folder.

Run the following command to create a new migration:

```sh
npm knex migrate:make migration_name
```

Run the migrations:

```sh
npm knex migrate:latest
```

Rollback the last migration:

```sh
npm knex migrate:rollback
```

## 🏗️ How To Run(Prefer run with Docker)
### 1. Run Locally without Docker
1. Clone the repository

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up the `.env` file based on `.env.example`

4. Execute schema.sql in your database

5. Run the application:

   ```sh
   npm run dev
   ```

### 2. Run with Docker (recommended)
```sh
docker-compose up --build
```

## Running Unit Tests
This service uses Jest for unit testing. Test cases are located in the `tests` directory.

To run the tests:

```sh
npm test
```

To run tests with coverage:

```sh
npm run test:coverage
```

## API Documentation (Swagger)
Once the service is running, you can access the Swagger API documentation at:

```
http://0.0.0.0:3000/api-docs
```

## PUBLIC ACCESS URL 

```
http://194.233.91.112:30886/api-docs
```

