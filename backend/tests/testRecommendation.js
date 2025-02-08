const request = require('supertest');
const app = require('../server');

describe('GET /api/recipes', () => {
  it('should return all recipes', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.statusCode).toEqual(200);
  });
});