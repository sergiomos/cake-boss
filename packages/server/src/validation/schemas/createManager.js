module.exports = {
  name: {
    presence: {
      message: "^name can't be empty",
    },
    length: {
      minimum: 3,
      tooShort: '^name must be larger or equal than 3',
    },
  },
  password: {
    presence: {
      message: "^password can't be empty",
    },
    length: {
      minimum: 6,
      tooShort: '^password must be larger or equal than 6',
    },
  },
  email: {
    email: {
      message: '^invalid email',
    },
    presence: {
      message: "^email can't be empty",
    },
  },
};
