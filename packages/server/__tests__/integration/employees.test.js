const request = require('supertest');

const app = require('../../src/app');
const conn = require('../../src/database/connection');
const UserModel = require('../../src/models/Users.model');

const API_ROUTE = '/employees';
const COLLECTION_NAME = 'users';

let managerId;

const cleanup = async () => {
  const db = await conn();
  const collection = db.collection(COLLECTION_NAME);

  await collection.deleteMany({});
};

const createManager = async () => {
  const manager = await UserModel.create({
    name: 'Gerente',
    email: 'manager@email.com',
    password: 'senha123',
    role: 'manager',
  });

  managerId = manager._id.toString();
};

describe('POST /employees', () => {
  describe('create an employee', () => {
    beforeEach(createManager);
    afterEach(cleanup);

    describe('on success', () => {
      it('return the created employee', async () => {
        const newEmployee = {
          email: 'employee@email.com',
          name: 'fulano',
          password: 'senha123',
          managerId,
          role: 'padeiro',
        };

        const response = await request(app)
          .post(API_ROUTE)
          .send(newEmployee);

        expect(response.statusCode).toBe(201);

        expect(response.body).toHaveProperty('_id');

        expect(response.body).toHaveProperty('name');
        expect(response.body.name).toBe(newEmployee.name);

        expect(response.body).toHaveProperty('email');
        expect(response.body.email).toBe(newEmployee.email);

        expect(response.body).toHaveProperty('role');
        expect(response.body.role).toBe(newEmployee.role);

        expect(response.body).toHaveProperty('managerId');
        expect(response.body.managerId).toBe(newEmployee.managerId);

        expect(response.body).not.toHaveProperty('password');
      });
    });

    describe('on fail', () => {
      beforeEach(createManager);
      afterEach(cleanup);

      describe('return error message by cases', () => {
        describe("Can't create with invalid", () => {
          describe('name', () => {
            it("Can't be empty", async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  password: 'senha123',
                  managerId,
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "name can't be empty",
                },
              });
            });

            it('Be equal or larger than 3', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'em',
                  email: 'employee@email.com',
                  password: 'senha123',
                  managerId,
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'name must be larger or equal than 3',
                },
              });
            });
          });

          describe('password', () => {
            it("Can't be empty", async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  name: 'fulano',
                  managerId,
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "password can't be empty",
                },
              });
            });

            it('Be equal or larger than 6', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'ciclano',
                  email: 'employee@email.com',
                  password: 'senha',
                  managerId,
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'password must be larger or equal than 6',
                },
              });
            });
          });

          describe('role', () => {
            it("Can't be empty", async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  name: 'fulano',
                  password: 'senha123',
                  managerId,
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "role can't be empty",
                },
              });
            });
          });

          describe('managerId', () => {
            it("Can't be empty", async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  name: 'fulano',
                  password: 'senha123',
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "managerId can't be empty",
                },
              });
            });

            it('Is valid', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  name: 'fulano',
                  password: 'senha123',
                  managerId: '1222',
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'invalid managerId',
                },
              });
            });

            it('Should exists', async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  email: 'employee@email.com',
                  name: 'fulano',
                  password: 'senha123',
                  managerId: '617deb2d3571e4ee657a88b3',
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(404);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'manager not found',
                },
              });
            });
          });

          describe('email', () => {
            it("Can't be empty", async () => {
              const response = await request(app)
                .post(API_ROUTE)
                .send({
                  name: 'fulano',
                  password: 'senha123',
                  managerId,
                  role: 'padeiro',
                });

              expect(response.statusCode).toBe(400);
              expect(response.body).toStrictEqual({
                err: {
                  message: "email can't be empty",
                },
              });
            });

            it('Is valid', async () => {
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
                    password: 'senha123',
                    managerId,
                    role: 'padeiro',
                    email,
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

            it('Should be unique', async () => {
              const employee = {
                email: 'employee@email.com',
                name: 'fulano',
                password: 'senha123',
                managerId,
                role: 'padeiro',
              };

              await UserModel.create(employee);

              const response = await request(app)
                .post(API_ROUTE)
                .send(employee);

              expect(response.statusCode).toBe(403);
              expect(response.body).toStrictEqual({
                err: {
                  message: 'user already exists',
                },
              });
            });
          });
        });
      });
    });
  });
});
