const supertest = require('supertest');

const db = require('../database/dbConfig');
const server = require('./server.js');

it('should use the test environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
});