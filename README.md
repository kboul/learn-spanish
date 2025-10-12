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
npx prisma migrate dev --name migration-name
```

e. in case there is an error regarding node_modules/@prisma/client/index.d.ts on other machines

```
pnpm dlx prisma generate
```

f. Seed the db with entries (optional)
Set prisma object on package.json and seed command and run

```
npx prisma db seed
```

3. Inluce in .env your clerk credentials

```
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
```

### View the db locally (http://localhost:5555)

```
npx prisma studio
```

4. Run the development server using only pnpm:

```
pnpm dev
```
