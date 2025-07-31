# Blog Management System

## 📌 Project Overview

This project is a NestJS-based GraphQL API that demonstrates user authentication, account management, and relational data handling using TypeORM with PostgreSQL. The API supports secure user signup, login, and updating profiles using JWT-based guards.

## 1) Project setup

```bash
$ npm install
```

## 2) Compile and run the project
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Configure environment variables:
```bash
DB_HOST=localhost
DB_PORT=5432
NODE_ENV=development

JWT_SECRET=secret_key
JWT_EXPIRES_IN=60m
```

### Run the seed data
```bash
npm run seed
```

## 3) How to run the API Locally
```bash
npm run start:dev

http://localhost:3000/graphql
```

## 4) GraphQL queries & Mutation
You can find all the sample queries and mutations in the following markdown file:

📄 [FeatureQuery.md](https://github.com/codecinn27/Blog_management_system/blob/main/graphql-docs/FeatureQuery.md)


## 5) Known Issues & Challenges
❗ Issue: Seeding Dummy Data
Initially struggled with inserting dummy data into the PostgreSQL database.

✅ Solution: Used faker.js to generate realistic dummy users and seeded them into a cloud PostgreSQL database using Neon Console.