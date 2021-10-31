const request = require('supertest');

const app = require('../../src/app');
const conn = require('../../src/database/connection');
const UserModel = require('../../src/models/Users.model');

const API_ROUTE = '/login';
const COLLECTION_NAME = 'users';

const createUser = async () => UserModel.create({
  name: 'fulano',
  email: 'fulano@email.com',
  password: 'senha1234',
  role: 'gerente',
});

const cleanup = async () => {
  const db = await conn();
  const collection = db.collection(COLLECTION_NAME);

  await collection.deleteMany({});
};

describe('POST /login', () => {
  describe('allow user to login', () => {
    let user;

    beforeEach(async () => {
      user = await createUser();
    });

    afterEach(async () => {
      await cleanup();
    });

    describe('on success', () => {
      it('return userId', async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            email: 'fulano@email.com',
            password: 'senha1234',
          });

        expect(response.statusCode).toBe(200);
        expect(response.body._id).toBe(user._id);
      });

      it('return user role', async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            email: 'fulano@email.com',
            password: 'senha1234',
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.role).toBe(user.role);
      });
    });

    describe('on fail', () => {
      it("Shouldn't login with invalid credentials", async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            email: 'ciclano@email.com',
            password: 'senha5678',
          });

        expect(response.statusCode).toBe(401);
        expect(response.body).toStrictEqual({
          err: {
            message: 'Wrong email or password',
          },
        });
      });
    });
  });
});
