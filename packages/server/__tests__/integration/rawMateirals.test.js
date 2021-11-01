const { ObjectId } = require('mongodb');
const request = require('supertest');

const app = require('../../src/app');

const API_ROUTE = '/rawMaterials';

const conn = require('../../src/database/connection');
const UserModel = require('../../src/models/Users.model');
const getCurrentDate = require('../../src/utils/getCurrentDate');
const { quantity } = require('../../src/validation/schemas/createRawMaterial');

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

const insertRawMaterials = async (rawMaterial, userId) => {
  const response = await request(app)
    .post(API_ROUTE)
    .send({
      ...rawMaterial,
      userId,
    });

  return response.body;
};

const createOrder = async (rawMaterialId, userId, quantity) => {
  const response = await request(app)
    .put(`${API_ROUTE}/${rawMaterialId}/request`)
    .send({
      userId,
      quantity,
    });

  return response.body;
};

describe('POST /rawMaterials', () => {
  describe('Insert raw material', () => {
    let userId = '';

    beforeEach(async () => {
      const user = await createUser();
      userId = user._id;
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
        expect(response.body.userId).toBe(userId.toString());
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
                  name: 'Ovo',
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
                name: 'Farinha',
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
                name: 'Leite',
                quantity: 5,
                userId: '617eb0e8eac282665804d270',
              });

            expect(response.statusCode).toBe(404);
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

describe('GET /rawMaterials?name', () => {
  let rawMaterial;

  beforeEach(async () => {
    const user = await createUser();
    rawMaterial = await insertRawMaterials({ name: 'Farinha de trigo', quantity: 6 }, user._id);
  });

  afterEach(async () => {
    await cleanup();
  });

  describe('List all created materials', () => {
    describe('on success', () => {
      it('return an array', async () => {
        const response = await request(app)
          .get(`${API_ROUTE}?name=farinha`);

        expect(Array.isArray(response.body)).toBe(true);
      });

      it('return material that includes name param', async () => {
        const response = await request(app)
          .get(`${API_ROUTE}?name=farinha`);

        expect(response.body).toStrictEqual([{
          _id: rawMaterial._id,
          name: 'Farinha de trigo',
          quantity: 6,
          user: 'fulano',
        }]);
      });
    });

    describe('on fail', () => {
      it('return material not found', async () => {
        const response = await request(app)
          .get(`${API_ROUTE}?name=leite`);

        expect(response.statusCode).toBe(404);
        expect(response.body).toStrictEqual({
          err: {
            message: 'raw material not found',
          },
        });
      });
    });
  });
});

describe('PUT /rawMaterials/:id/request', () => {
  let rawMaterialId;
  let userId;
  let userName;

  beforeEach(async () => {
    const user = await createUser();
    const rawMaterial = await insertRawMaterials({ name: 'Farinha de trigo', quantity: 6 }, user._id);

    userId = user._id;
    userName = user.name;
    rawMaterialId = rawMaterial._id;
  });

  afterEach(async () => {
    await cleanup();
  });

  describe('Register a raw material request order', () => {
    describe('on success', () => {
      it('should return the created order', async () => {
        const response = await request(app)
          .put(`${API_ROUTE}/${rawMaterialId}/request`)
          .send({
            userId,
            quantity: 2,
          });

        expect(response.statusCode).toBe(200);

        expect(response.body).toHaveProperty('quantity');
        expect(response.body.quantity).toBe(2);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toBe(userName);
      });
    });

    describe('on fail', () => {
      describe('return error message by case', () => {
        describe('should not be able to request with invalid entries', () => {
          describe('rawMaterialId', () => {
            it('should be valid id', async () => {
              const response = await request(app)
                .put(`${API_ROUTE}/54454/request`)
                .send({
                  userId,
                  quantity: 2,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'invalid rawMaterialId',
                },
              });
            });
            it('should exists', async () => {
              const response = await request(app)
                .put(`${API_ROUTE}/617eb0e8eac282665804d270/request`)
                .send({
                  userId,
                  quantity: 2,
                });

              expect(response.statusCode).toBe(404);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'raw material not found',
                },
              });
            });
          });

          describe('quantity', () => {
            it('should not be lower than 1', async () => {
              const response = await request(app)
                .put(`${API_ROUTE}/${rawMaterialId}/request`)
                .send({
                  userId,
                  quantity: 0,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'quantity must be greater than 0',
                },
              });
            });

            it('should not be greater than material in stock', async () => {
              const response = await request(app)
                .put(`${API_ROUTE}/${rawMaterialId}/request`)
                .send({
                  userId,
                  quantity: 10,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'quantity must be equal or lower than quantity in stock',
                },
              });
            });
          });
        });
      });
    });
  });
});

describe('GET /rawMaterials?user', () => {
  let user;
  let rawMaterial;

  beforeEach(async () => {
    user = await createUser();
    rawMaterial = await insertRawMaterials({ name: 'Farinha de trigo', quantity: 6 }, user._id);

    await createOrder(rawMaterial._id, user._id, 2);
  });
  describe('List all raw materials request orders', () => {
    describe('on success', () => {
      it('return an array', async () => {
        const response = await request(app)
          .get(`${API_ROUTE}?user=${user.name}`);

        expect(Array.isArray(response.body)).toBe(true);
      });

      it('the list match', async () => {
        const response = await request(app)
          .get(`${API_ROUTE}?user=${user.name}`);

        expect(response.body).toHaveProperty('_id');
        expect(ObjectId.isValid(response.body._id)).toBe(true);

        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe(rawMaterial.name);

        expect(response.body).toHaveProperty('user');
        expect(response.body.user).toBe(user.name);

        expect(response.body).toHaveProperty('quantity');
        expect(response.body.quantity).toBe(2);

        expect(response.body).toHaveProperty('createdDate');
        expect(response.body.name).toBe(getCurrentDate());
      });
    });
  });
});
