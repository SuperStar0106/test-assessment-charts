### T3 / Recharts POC

This is a POC for a charting library using Recharts and a backend using Node, TRPC, Next.js and Prisma w/ MongoDB.

#### Pre-requisites

##### Software
- [Node.js](https://nodejs.org/en/)
- [Docker](https://www.docker.com/) (Optional)

##### Environment Variables
- `DATABASE_URL` - The URL to the MongoDB database 


#### Tests 

There are E2E and Unit tests for the backend and the frontend respectively. 

It uses Vitest for Unit Testing the tRPC API and Playwright for E2E testing the frontend.

To run the tests, use the following commands:

```bash
npm run test-unit # For running the unit tests
npm run test-e2e # For running the e2e tests
```

#### CI/CD

The project uses Github Actions for CI/CD. It runs the tests and builds the typescript code on every push to the main branch.

#### Setup

1. Clone the repository

2. Install the dependencies

    ```bash
    npm install
    ```

    #### Run Locally

    1. Set .env file

        ```bash
        DATABASE_URL=mongodb://user:xxxxxxxx@xxxxxxxxx:27017/database
        ```

    2. Populate the database

        ```bash
        npm run db:generate
        npm run db:populate
        ```

    3. Start the project

        ```bash
        npm dev
        ```
    #### Run using Docker
    
    ##### Docker

    1. Build the image

        ```bash
        docker build -t chart-poc .
        ```

    2. Run the container

        ```bash
        docker run -p 3000:3000 -e DATABASE_URL="your_mongodb_url" chart-poc
        ```
    
    #### Docker Compose

    1. Set the .env file

        ```bash
        DATABASE_URL=mongodb://user:xxxxxxxx@xxxxxxxxx:27017/database
        ```

    2. Run the docker-compose file

        ```bash
        docker-compose up
        ```
    



