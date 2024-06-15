const request = require('supertest');
const app = require('../index'); // Assuming your Express app setup is in index.js or app.js

describe('GET /banks', () => {
  it('should fetch all banks', async () => {
    const response = await request(app).get('/banks');
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should fetch branches for a specific bank', async () => {
    // Assuming you have at least one bank in the database with branches
    const banksResponse = await request(app).get('/banks');
    const bankId = banksResponse.body[0].id; // Assuming first bank in the list

    const response = await request(app).get(`/banks/${bankId}/branches`);
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('ifsc');
    expect(response.body[0]).toHaveProperty('name');
    expect(response.body[0]).toHaveProperty('address');
    expect(response.body[0]).toHaveProperty('city');
    expect(response.body[0]).toHaveProperty('district');
    expect(response.body[0]).toHaveProperty('state');
  });

  it('should return 404 if bank ID does not exist', async () => {
    const nonExistentBankId = 999999; // Assuming this ID does not exist
    const response = await request(app).get(`/banks/${nonExistentBankId}/branches`);
    expect(response.status).toBe(404);
  });
});

// Optional: Add more test cases as needed for other endpoints or edge cases

afterAll(async () => {
  // Clean up tasks like closing database connections
  await new Promise(resolve => setTimeout(() => resolve(), 500)); // Wait for pending operations to complete
});

