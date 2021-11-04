import React from 'react';
import { func } from 'prop-types';

// import useUserContext from '../../hooks/useUserContext';

import Modal from '../Modal';

import TextInput from '../TextInput';
import H2 from '../Titles/H2';

// import { Form, RolesSelect, RoleOption } from './style';
import Button from '../Button';

const AddMaterialForm = ({ close }) => (
  <Modal close={close}>
    <form>
      <H2>Adicionar materia prima</H2>

      <TextInput
        type="text"
        placeholder="Nome"
        name="name"
        minLength={3}
        required
      />

      <TextInput
        type="number"
        placeholder="Quantidade"
        name="quantity"
        min={1}
        required
      />

      <Button type="submit">Cadastrar</Button>
    </form>
  </Modal>
);

AddMaterialForm.propTypes = {
  close: func,
}.isRequired;

export default AddMaterialForm;
