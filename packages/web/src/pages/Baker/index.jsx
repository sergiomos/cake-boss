import React, { useState } from 'react';

import Header from '../../components/Header';
import searchForRawMaterial from '../../services/searchForRawMaterial';

import {
  Container, FlexBox, SearchBar, SearchBtn,
} from './style';

const BakerPage = () => {
  const [searchData, setSearchData] = useState('');
  const [rawMaterials, setRawMaterials] = useState([]);

  const handleSearch = async () => {
    const foundRawMaterials = await searchForRawMaterial(searchData);

    setRawMaterials(foundRawMaterials);
  };
  return (
    <Container>
      <Header />

      <FlexBox>
        <SearchBar
          type="text"
          placeholder="Procure por uma matéria prima"
          value={searchData}
          onChange={({ target }) => setSearchData(target.value)}
        />
        <SearchBtn
          type="button"
          onClick={handleSearch}
        >
          Pesquisar
        </SearchBtn>
      </FlexBox>

      {!!rawMaterials.length && 'carregou'}
    </Container>
  );
};

export default BakerPage;
