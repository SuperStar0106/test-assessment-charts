### T3 / Recharts POC

#### Setup

1. Clone the repository

2. Install the dependencies

    ```bash
    npm install
    ```

3. Set .env file

    ```bash
    DATABASE_URL=postgres://user:xxxxxxxx@xxxxxxxxx:5432/database
    ```

4. Run the migrations and Populate the database

    ```bash
    npm run db:push
    npm run db:populate
    ```

5. Start the project

    ```bash
    npm start
    ```
