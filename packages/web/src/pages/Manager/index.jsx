import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';
import getEmployeeOrders from '../../services/getEmployeeOrders';

import EmployeesOrders from '../../components/EmployeesOrders';
import {
  Container, SearchBtn, SearchBar, FlexBox,
} from './style';

const ManagerHome = () => {
  const { user } = useUserContext();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeOrders, setEmployeeOrders] = useState([{
    user: 'fulano',
    name: 'Farinha',
    quantity: 5,
    createdDate: '2021-10-01',
  }]);

  const handleSearch = async () => {
    const orders = await getEmployeeOrders();
    setEmployeeOrders(orders);
  };

  if (user.role !== 'manager') return (<Redirect to="/" />);
  return (
    <Container>
      <FlexBox>
        <SearchBar
          type="text"
          placeholder="Digite o nome de um colaborador"
          value={employeeName}
          onChange={({ target }) => setEmployeeName(target.value)}
        />

        <SearchBtn
          type="button"
          bgColor="#33CA7F"
          onClick={handleSearch}
        >
          Pesquisar
        </SearchBtn>
      </FlexBox>

      {!!employeeOrders.length && (
      <EmployeesOrders
        orders={employeeOrders}
      />
      )}
    </Container>
  );
};

export default ManagerHome;
