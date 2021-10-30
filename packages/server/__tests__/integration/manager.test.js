const request = require('supertest');

const app = require('../../src/app');
const conn = require('../../src/database/connection');

const API_ROUTE = '/manager';
const COLLECTION_NAME = 'managers';

describe('POST /manager', () => {
  afterEach(async () => {
    const db = await conn();
    const collection = db.collection(COLLECTION_NAME);

    await collection.deleteMany({});
  });

  describe('Create manager successfully', () => {
    it('should return the new manager', async () => {
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
      expect(response.body.name).toBe(newManager.name);

      expect(response.body).toHaveProperty('email');
      expect(response.body.email).toBe(newManager.email);

      expect(response.body).toHaveProperty('role');
      expect(response.body.role).toBe('manager');

      expect(response.body).not.toHaveProperty('password');
    });
  });

  describe('Create manager error', () => {
    describe('Can not create a manager with', () => {
      describe('invalid name', () => {
        it('name can not be empty', async () => {
          const response = await request(app)
            .post(API_ROUTE)
            .send({
              email: 'fulano@email.com',
              password: '1234567',
            });

          expect(response.statusCode).toBe(400);
          expect(response.body).toStrictEqual({
            err: {
              message: "name can't be empty",
            },
          });
        });

        it('name must be larger or equal than 3', async () => {
          const response = await request(app)
            .post(API_ROUTE)
            .send({
              name: 'a',
              email: 'fulano@email.com',
              password: '1234567',
            });

          expect(response.statusCode).toBe(400);
          expect(response.body).toStrictEqual({
            err: {
              message: 'name must be larger or equal than 3',
            },
          });
        });
      });

      describe('invalid password', () => {
        it('password can not be empty', async () => {
          const response = await request(app)
            .post()
            .send({
              email: 'fulano@email.com',
              name: 'fulano',
            });

          expect(response.statusCode).toBe(400);
          expect(response.body).toStrictEqual({
            err: {
              message: "password can't be empty",
            },
          });
        });

        it('password must be larger or equal than 6', async () => {
          const response = await request(app)
            .post(API_ROUTE)
            .send({
              name: 'fulano',
              email: 'fulano@email.com',
              password: '12345',
            });

          expect(response.statusCode).toBe(400);
          expect(response.body).toStrictEqual({
            err: {
              message: 'password must be larger or equal than 6',
            },
          });
        });
      });

      describe('invalid email', () => {
        it('email is invalid', async () => {
          const invalidEmail = [
            'fulano',
            'fulano.com',
            'fulano@.com',
            '@email.com',
            'fulano@email',
            'fulano@',
          ];

          const expects = invalidEmail.map(async (email) => {
            const response = await request(app)
              .post(API_ROUTE)
              .send({
                name: 'fulano',
                email,
                password: '1234567',
              });

            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
              err: {
                message: 'invalid email',
              },
            });
          });

          await Promise.all(expects);
        });
      });
    });
  });
});
