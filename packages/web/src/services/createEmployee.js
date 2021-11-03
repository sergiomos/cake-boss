import axios from 'axios';

const createEmployee = async (newEmployee) => {
  try {
    await axios.post('/employees', newEmployee);
    return 'Funcionário cadastrado com sucesso';
  } catch (err) {
    const { response: { status } } = err;

    switch (status) {
      case 403:
        return 'Usuário ja cadastrado';
      case 400:
        return 'Informações erradas, verifique e tente novamente';
      case 404:
        return 'Gerente não encontrado';
      default:
    }

    return null;
  }
};

export default createEmployee;
