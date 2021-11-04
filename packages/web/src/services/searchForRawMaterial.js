import axios from 'axios';

const searchForRawMaterial = async (rawMaterialName) => {
  try {
    const { data: foundRawMaterials } = await axios.get(`/rawMaterials?name=${rawMaterialName}`);
    return { foundRawMaterials };
  } catch (error) {
    return { message: 'Produto não encontrado' };
  }
};

export default searchForRawMaterial;
