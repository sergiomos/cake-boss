import React from 'react';

import Header from '../../components/Header';

import {
  Container, FlexBox, SearchBar, SearchBtn,
} from './style';

const BakerPage = () => (
  <Container>
    <Header />

    <FlexBox>
      <SearchBar
        type="text"
        placeholder="Procure por uma matéria prima"
      />
      <SearchBtn type="button">Pesquisar</SearchBtn>
    </FlexBox>
  </Container>
);

export default BakerPage;
