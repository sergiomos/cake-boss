import React, { useState } from 'react';
import { func } from 'prop-types';

import Modal from '../Modal';

import TextInput from '../TextInput';
import H2 from '../Titles/H2';

import { Form, RolesSelect, RoleOption } from './style';
import Button from '../Button';

const CreateEmployeeForm = ({ close }) => {
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const handleInputsChange = ({ target }) => {
    const { name, value } = target;
    setNewEmployee({
      ...newEmployee,
      [name]: value,
    });
  };

  const handleEmployeeInsert = (e) => {
    e.preventDefault();
    console.log(newEmployee);
  };

  return (
    <Modal close={close}>
      <Form onSubmit={handleEmployeeInsert}>
        <H2>Cadastrar Funcionario</H2>
        <TextInput
          type="text"
          placeholder="Nome do funcionario"
          name="name"
          minLength={3}
          value={newEmployee.name}
          onChange={handleInputsChange}
        />

        <TextInput
          type="email"
          placeholder="Email do funcionario"
          value={newEmployee.email}
          name="email"
          onChange={handleInputsChange}
        />

        <RolesSelect
          name="role"
          value={newEmployee.role}
          onChange={handleInputsChange}
        >
          <RoleOption selected disabled>Escolha uma função</RoleOption>
          <RoleOption value="baker">Padeiro</RoleOption>
          <RoleOption value="stockist">Estoquista</RoleOption>
        </RolesSelect>

        <TextInput
          type="password"
          value={newEmployee.password}
          placeholder="Senha do funcionario"
          name="password"
          minLength={6}
          onChange={handleInputsChange}
        />

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Modal>
  );
};

CreateEmployeeForm.propTypes = {
  close: func,
}.isRequired;

export default CreateEmployeeForm;
