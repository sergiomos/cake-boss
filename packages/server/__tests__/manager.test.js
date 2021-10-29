const request = require('supertest');

const app = require('../src/app');

const API_ROUTE = '/manager'

describe('POST /manager', () => {
	describe('Create a manager', () => {
		it('should create successfully', async () => {
			const newManager = {
				email: 'manager@email.com',
				name: 'fulano',
				password: 'senha123',
			};

			const response = await request(app)
				.post(API_ROUTE)
				.send(newManager);

			expect(response.statusCode).toBe(201);
			expect(response.body).toHaveProperty('_id');
			expect(response.body).toHaveProperty('name');
			expect(response.body).toHaveProperty('email');
			expect(response.body).not.toHaveProperty('password');
		})
	});
});
