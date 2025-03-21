# Learn Spanish

## Installation

1. Create a .env and include your **DATABASE_URL** from **neon**
   Visit neon and create a new project with a new db, then go to **Dashboard -> connect** button and take the **connection string**

```
DATABASE_URL=...
```

2. Install, init, generate & migrate **prisma**

a. Install

```
npm i -D prisma
```

b. Init

```
npx prisma init
```

c. Once prisma schema is modified run

```
npx prisma generate
```

d. Create prisma migrations

```
npx prisma migrate dev
```

3. Seed the db with entries (optional)
   Set prisma object on package.json and seed command and run

```
npx prisma db seed
```

## View the db locally (http://localhost:5555)

```
npx prisma studio
```
