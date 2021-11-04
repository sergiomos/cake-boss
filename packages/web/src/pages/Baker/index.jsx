import React, { useState } from 'react';

import useUserContext from '../../hooks/useUserContext';

import Header from '../../components/Header';
import ListRawMaterials from '../../components/ListRawMaterials';
import searchForRawMaterial from '../../services/searchForRawMaterial';

import {
  Container, FlexBox, SearchBar, SearchBtn,
} from './style';
import createNewRawMaterialOrder from '../../services/createNewRawMaterialOrder';

const BakerPage = () => {
  const { user: { _id: userId } } = useUserContext();
  const [searchData, setSearchData] = useState('');
  const [rawMaterials, setRawMaterials] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const cleanResponseMessage = () => {
    setTimeout(() => {
      setResponseMessage('');
    }, 1500);
  };

  const handleSearch = async () => {
    const { foundRawMaterials = [], message = '' } = await searchForRawMaterial(searchData);

    setResponseMessage(message);
    setRawMaterials(foundRawMaterials);
    cleanResponseMessage();
  };

  const handleOrderRequest = async (e, rawMaterialId) => {
    e.preventDefault();
    const { value: quantity } = e.target.firstChild;
    const message = await createNewRawMaterialOrder({
      rawMaterialId,
      quantity,
      userId,
    });

    setResponseMessage(message);
    cleanResponseMessage();
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

      {responseMessage}

      {!!rawMaterials.length && (
      <ListRawMaterials
        rawMaterials={rawMaterials}
        handleOrderRequest={handleOrderRequest}
      />
      )}
    </Container>
  );
};

export default BakerPage;
