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
    const { _id: userId } = user || {};

    beforeEach(async () => {
      user = await createUser();
    });

    afterEach(async () => {
      await cleanup();
    });

    describe('on success', () => {
      it('return material name', async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(201);
        expect(response.body.name).toBe('Farinha de Trigo');
      });

      it('return userId from who insert', async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(201);
        expect(response.body.userId).toStrictEqual(userId);
      });

      it('return the quantity', async () => {
        const response = await request(app)
          .post(API_ROUTE)
          .send({
            name: 'Farinha de Trigo',
            quantity: 10,
            userId,
          });

        expect(response.statusCode).toBe(201);
        expect(response.body.quantity).toBe(10);
      });
    });

    describe('on fail', () => {
      describe('return error messages by case', () => {
        describe("Can't insert with invalid", () => {
          describe('name', () => {
            it('should not be empty', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  quantity: 10,
                  userId,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "name can't be empty",
                },
              });
            });

            it('should be equal or larger than 3', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'Ov',
                  quantity: 5,
                  userId,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'name must be equal or larger than 3',
                },
              });
            });
          });

          describe('quantity', () => {
            it('should not be empty', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'Farinha de Trigo',
                  userId,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "quantity can't be empty",
                },
              });
            });

            it('Should be greater than 0', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'Ov',
                  quantity: -2,
                  userId,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'quantity must be greater than 0',
                },
              });
            });
          });
        });

        describe('userId', () => {
          it('should not be empty', async () => {
            const response = await request(app)
              .post(API_ROUTE)
              .send({
                name: 'Farinha de Trigo',
                quantity: 10,
              });

            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
              err: {
                message: "userId can't be empty",
              },
            });
          });

          it('should be valid', async () => {
            const response = await request(app)
              .post(API_ROUTE)
              .send({
                name: 'Ov',
                quantity: 5,
                userId: '516512',
              });

            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
              err: {
                message: 'userId invalid',
              },
            });
          });

          it('should exists', async () => {
            const response = await request(app)
              .post(API_ROUTE)
              .send({
                name: 'Ov',
                quantity: 5,
                userId: '617deb2d3571e4ee657a88b3',
              });

            expect(response.statusCode).toBe(400);
            expect(response.body).toStrictEqual({
              err: {
                message: 'user not found',
              },
            });
          });
        });
      });
    });
  });
});
