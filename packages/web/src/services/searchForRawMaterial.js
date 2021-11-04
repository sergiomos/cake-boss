import axios from 'axios';

const searchForRawMaterial = async (rawMaterialName) => {
  try {
    const foundRawMaterials = await axios.get(`/rawMaterials?name=${rawMaterialName}`);
    return foundRawMaterials;
  } catch (error) {
    console.log(error.response);
    return null;
  }
};

export default searchForRawMaterial;
