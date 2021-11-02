import React from 'react';
import { Redirect } from 'react-router-dom';

import useUserContext from '../../hooks/useUserContext';

import {
  Container, SearchBtn, SearchBar, FlexBox,
} from './style';

const ManagerHome = () => {
  const { user } = useUserContext();

  if (user.role !== 'manager') return (<Redirect to="/" />);
  return (
    <Container>
      <FlexBox>
        <SearchBar
          type="text"
          placeholder="Digite o nome de um colaborador"
        />

        <SearchBtn
          type="button"
          bgColor="#33CA7F"
        >
          Pesquisar
        </SearchBtn>
      </FlexBox>
    </Container>
  );
};

export default ManagerHome;
