const request = require('supertest');

const app = require('../../src/app');

const API_ROUTE = '/rawMaterial';

const conn = require('../../src/database/connection');
const UserModel = require('../../src/models/Users.model');

const createUser = async () => UserModel.create({
  name: 'fulano',
  email: 'fulano@email.com',
  password: 'senha1234',
  role: 'estoquista',
});

const cleanup = async () => {
  const db = await conn();
  await db.collection('users').deleteMany({});
  await db.collection('rawMaterials').deleteMany({});
  await db.collection('orders').deleteMany({});
};

describe('POST /rawMaterials', () => {
  describe('Insert raw material', () => {
    let user;
    const { _id: userId } = user;

    beforeEach(async () => {
      user = await createUser();
    });

    afterEach(async () => {
      await cleanup();
    });

    describe('on success', () => {
      it('return material name', () => {
        const response = request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.name).toBe('Farinha de Trigo');
      });

      it('return userId from who insert', () => {
        const response = request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toStrictEqual(userId);
      });

      it('return the quantity', () => {
        const response = request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.quantity).toBe(10);
      });
    });
  });
});
