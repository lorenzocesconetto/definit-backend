# Prisma - Cheat Sheet

For more in depth explanations on the CLI please visit the [command reference](https://www.prisma.io/docs/reference/api-reference/command-reference)

## 1. Setup

Install the Prisma CLI as a **development** dependency in the project:

```
npm install prisma --save-dev
```

Install prisma client as a **production** dependency:

```
npm install @prisma/client
```

Initialize prisma within project (creates initial config):

```
npx prisma init --datasource-provider postgresql
```

## 2. Migrations

Create a new SQL migration file + run the SQL migration file against the database. Use `--name` flag to give the migration a descriptive name:

```
npx prisma migrate dev --name "initial migration" --skip-seed
```

The `--create-only` command allows you to create a migration without applying it:

```
npx prisma migrate dev --create-only
```

In production and testing environments, use the `migrate deploy` command to apply migrations (instead of `migrate dev`):

```
npx prisma migrate deploy
```

Reset database. Please notice that **all data is lost**, and migrations are applied from scratch. This is only intended for **development purposes**:

```
npx prisma migrate reset --skip-seed
```

## 3. Data

First add the following to `package.json`:

```
"prisma": {
        "seed": "ts-node prisma/seed.ts"
      },
```

The command below runs the `prisma/seed.ts` script to populate the database with some initial data:

```
npx prisma db seed
```

Prisma Studio is a visual editor for the data in the database:

```
npx prisma studio
```
