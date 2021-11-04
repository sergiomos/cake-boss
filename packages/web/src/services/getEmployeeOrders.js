import axios from 'axios';

const getEmployeeOrders = async (employeeName) => {
  const { data } = await axios.get(`/rawMaterials?user=${employeeName}`);
  console.log(employeeName);
  return data;
};

export default getEmployeeOrders;
