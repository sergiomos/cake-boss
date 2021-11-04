import React, { useState } from 'react';

import AddMaterialForm from '../../components/AddMaterialForm';
import Header from '../../components/Header';

import { Container, AddMaterialBtn } from './style';

const StockistPage = () => {
  const [displayAddMaterialForm, setDisplayAddMaterialForm] = useState(true);

  return (
    <Container>
      <Header />
      <AddMaterialBtn
        type="button"
        onClick={() => setDisplayAddMaterialForm(true)}
      >
        Adicionar Matéria Prima
      </AddMaterialBtn>

      { displayAddMaterialForm && (
      <AddMaterialForm
        close={() => setDisplayAddMaterialForm(false)}
      />
      )}
    </Container>
  );
};

export default StockistPage;
