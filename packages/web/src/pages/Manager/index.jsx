import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';
import getEmployeeOrders from '../../services/getEmployeeOrders';

import EmployeesOrders from '../../components/EmployeesOrders';
import CreateEmployeeForm from '../../components/CreateEmployeeForm';
import Header from '../../components/Header';

import {
  Container,
  SearchBtn,
  SearchBar,
  FlexBox,
  CreateEmployeeBtn,
  ResponsiveBox,
} from './style';

const ManagerHome = () => {
  const { user } = useUserContext();
  const [employeeName, setEmployeeName] = useState('');
  const [employeeOrders, setEmployeeOrders] = useState([]);
  const [displayCreateEmployeeModal, setDisplayCreateEmployeeModal] = useState(false);

  const handleSearch = async () => {
    const orders = await getEmployeeOrders(employeeName);
    setEmployeeOrders(orders);
  };

  if (user.role !== 'manager') return (<Redirect to="/" />);
  return (
    <Container>
      <Header />
      <ResponsiveBox>
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
          onClick={() => setDisplayCreateEmployeeModal(true)}
        >
          Cadastrar funcionário
        </CreateEmployeeBtn>
      </ResponsiveBox>

      {!!employeeOrders.length && (
      <EmployeesOrders
        orders={employeeOrders}
      />
      )}

      {displayCreateEmployeeModal && (
      <CreateEmployeeForm
        close={() => setDisplayCreateEmployeeModal(false)}
      />
      )}
    </Container>
  );
};

export default ManagerHome;
