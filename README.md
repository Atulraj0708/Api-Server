Overview
This project is a RESTful API built with Node.js, Express, and Sequelize. It provides endpoints to retrieve information about banks and their branches from a CSV file. The API supports retrieving all banks and the branches associated with a specific bank.

Features
Fetch a list of all banks.
Retrieve branches for a specific bank based on its ID.
Seamless data loading from a CSV file into a SQLite database.
Technologies Used
Node.js: JavaScript runtime for building the server.
Express: Web framework for Node.js to handle HTTP requests.
Sequelize: ORM for Node.js to interact with the SQLite database.
CSV-parser: Library to parse CSV files.
Supertest: Library for testing HTTP endpoints.

Database Initialization
Run the data loading script to populate the database with data from the CSV file:
node loadData.js

Running the Server
Start the server with the following command:
node index.js

The server will be accessible at http://localhost:5000.

API Endpoints
Get All Banks
Endpoint: GET /banks
Description: Retrieve a list of all banks.
Example request:
 http://localhost:5000/banks

 Get Branches by Bank ID
Endpoint: GET /banks/:bankId/branches
Description: Retrieve branches for a specific bank by its ID.
Example request:
curl http://localhost:5000/banks/60/branches

Testing
Run the tests using Jest and Supertest:
npm test
