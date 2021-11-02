import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';
import getEmployeeOrders from '../../services/getEmployeeOrders';

import {
  Container, SearchBtn, SearchBar, FlexBox,
} from './style';

const ManagerHome = () => {
  const { user } = useUserContext();
  const [employeeName, setEmployeeName] = useState('');

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
          onClick={getEmployeeOrders}
        >
          Pesquisar
        </SearchBtn>
      </FlexBox>
    </Container>
  );
};

export default ManagerHome;
