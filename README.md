# Azion backend

## - Relevant links

-   [Uniswap contracts deployments](https://docs.uniswap.org/contracts/v3/reference/deployments)

-   [Chains metadata](https://chainlist.org)

-   [Chains metadata JSON](https://chainid.network/chains.json)

---

## - Docker

### 1. Postgres

-   Start `psql` shell:

    ```
    psql -U user azion
    ```

---

## - Database

Database ise hosted at a Google SQL Instance and running PostgreSQL 14. It's named "azion-db".

Public IP address: `34.151.214.97`.

-   You may connect using the Cloud SQL Proxy:

    ```
    cloud_sql_proxy -instances=playground-294014:southamerica-east1:azion=tcp:3306
    ```

-   Then run (replace `username` and `password` with the appropriate values):

    ```
    psql "postgresql://username:password@localhost:3306/azion"
    ```

-   Describe database:

    ```
    gcloud sql instances describe azion-db
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
