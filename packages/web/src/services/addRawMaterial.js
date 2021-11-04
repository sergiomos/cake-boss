import axios from 'axios';

const addRawMaterial = async (rawMaterial) => {
  try {
    await axios.post('/rawMaterials', rawMaterial);

    return 'Materia prima cadastrada com sucesso';
  } catch (error) {
    const { err } = error.response;

    return err.message;
  }
};

export default addRawMaterial;
