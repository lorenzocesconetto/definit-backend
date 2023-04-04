# Definit backend

## - Relevant links

-   [Uniswap contracts deployments](https://docs.uniswap.org/contracts/v3/reference/deployments)

-   [Chains metadata](https://chainlist.org)

-   [Chains metadata JSON](https://chainid.network/chains.json)

---

## - Docker

### 1. Postgres

-   Start `psql` shell:

    ```
    psql -U user definit
    ```

---

## - Database

Database ise hosted at a Google SQL Instance and running PostgreSQL 14. It's named "definit".

Public IP address: `34.151.200.30`.

-   You may connect using the Cloud SQL Proxy:

    ```
    cloud_sql_proxy -instances=playground-294014:southamerica-east1:definit=tcp:3306
    ```

-   Then run (replace `username` and `password` with the appropriate values). You may also run this command to connect directly to the database (you may need to whitelist your IP address for this):

    ```
    psql "postgresql://username:password@localhost:3306/definit"
    ```

-   You can apply migrations to the remote database by setting the `DATABASE_URL` variable in the `.env` file to point to `cloud sql proxy` (which is usually `localhost:3306`) or point directly to the database IP address (you may need to whitelist your IP address within Google Cloud SQL). Then just run the commands.

    ```
    npx prisma migrate deploy
    npx prisma db seed
    ```

-   Describe database:

    ```
    gcloud sql instances describe definit
    ```

-   If you try to connect directly (not using Cloud SQL Proxy), you need your IP address authorized for connection. First, to check your IP address please visit: https://checkip.amazonaws.com/ then share your IP address with the cloud administrator.

-   For more information please see this [quick start guide](https://cloud.google.com/sql/docs/mysql/connect-instance-auth-proxy).

---

## - gcloud CLI

-   List accounts:

```
gcloud auth list
```

-   Set account:

```
gcloud config set account `ACCOUNT`
```

-   List projects:

```
gcloud projects list
```

-   Set project:

```
gcloud config set project `PROJECT ID`
```

---

## - Heroku

View app `logs`. You must press some key and then login within the browser. Beware that `Safari` may be hiding your actual `IP address` which will cause an error. If that's the case use another browser instead:

```
heroku logs --app definit --source app
```
