import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';
import getEmployeeOrders from '../../services/getEmployeeOrders';

import EmployeesOrders from '../../components/EmployeesOrders';
import {
  Container,
  SearchBtn,
  SearchBar,
  FlexBox,
  CreateEmployeeBtn,
} from './style';

const ManagerHome = () => {
  const { user } = useUserContext();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeOrders, setEmployeeOrders] = useState([]);

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

      <CreateEmployeeBtn
        type="button"
        bgColor="#2660A4"
      >
        Cadastrar funcionário
      </CreateEmployeeBtn>

      {!!employeeOrders.length && (
      <EmployeesOrders
        orders={employeeOrders}
      />
      )}
    </Container>
  );
};

export default ManagerHome;
