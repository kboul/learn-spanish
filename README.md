# Learn Spanish

## Installation

1. Create a .env and include your **DATABASE_URL** from **neon**

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

## View the db

```
npx prisma studio
```
