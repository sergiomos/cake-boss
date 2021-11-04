import React, { useState } from 'react';
import { func } from 'prop-types';

import useUserContext from '../../hooks/useUserContext';

import Modal from '../Modal';

import TextInput from '../TextInput';
import H2 from '../Titles/H2';

import Button from '../Button';
import Form from './style';
import addRawMaterial from '../../services/addRawMaterial';

const AddMaterialForm = ({ close }) => {
  const [newMaterial, setNewMaterial] = useState({ name: '', quantity: 0 });
  const [responseStatusMessage, setResponseStatusMessage] = useState('');
  const { user: { _id: userId } } = useUserContext();

  const handleInputChange = ({ target }) => {
    const { name, value } = target;
    setNewMaterial({
      ...newMaterial,
      [name]: value,
    });
  };

  const resetResponseStatusMessage = () => {
    setTimeout(() => {
      setResponseStatusMessage('');
    }, 1500);
  };

  const handleInsertMaterial = async (e) => {
    e.preventDefault();
    setResponseStatusMessage('loading');
    const response = await addRawMaterial({ ...newMaterial, userId });
    setResponseStatusMessage(response);
    resetResponseStatusMessage();
  };

  return (
    <Modal close={close}>
      <Form
        onSubmit={handleInsertMaterial}
      >
        <H2>Adicionar materia prima</H2>
        {responseStatusMessage !== 'loading' && responseStatusMessage}
        <TextInput
          type="text"
          placeholder="Nome"
          name="name"
          minLength={3}
          onChange={handleInputChange}
          value={newMaterial.name}
          required
        />

        <TextInput
          type="number"
          placeholder="Quantidade"
          onChange={handleInputChange}
          name="quantity"
          value={newMaterial.quantity}
          min={1}
          required
        />

        <Button
          type="submit"
          disabled={responseStatusMessage === 'loading'}
        >
          {responseStatusMessage === 'loading' ? 'Carregando' : 'Cadastrar'}
        </Button>
      </Form>
    </Modal>
  );
};

AddMaterialForm.propTypes = {
  close: func,
}.isRequired;

export default AddMaterialForm;
