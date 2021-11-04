import axios from 'axios';

const createNewRawMaterialOrder = async ({ rawMaterialId, userId, quantity }) => {
  try {
    const route = `/rawMaterials/${rawMaterialId}/request`;

    await axios.put(route, { userId, quantity: Number(quantity) });

    return 'Ordem realizada com sucesso';
  } catch (error) {
    const { response } = error;
    console.log(response.data);
    return '';
  }
};

export default createNewRawMaterialOrder;
