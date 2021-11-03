import React, { useState } from 'react';
import { func } from 'prop-types';

import useUserContext from '../../hooks/useUserContext';

import Modal from '../Modal';

import TextInput from '../TextInput';
import H2 from '../Titles/H2';

import { Form, RolesSelect, RoleOption } from './style';
import Button from '../Button';
import createEmployee from '../../services/createEmployee';

const CreateEmployeeForm = ({ close }) => {
  const { user } = useUserContext();
  const [createEmployeeStatus, setCreateEmployeeStatus] = useState('');

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

  const resetStatus = () => {
    setTimeout(() => {
      setCreateEmployeeStatus('');
    }, 1500);
  };

  const clearNewEmployee = () => {
    setNewEmployee({
      name: '',
      email: '',
      password: '',
      role: '',
    });
  };

  const handleEmployeeInsert = async (e) => {
    e.preventDefault();
    const message = await createEmployee({ ...newEmployee, managerId: user._id });
    setCreateEmployeeStatus(message);
    resetStatus();
    clearNewEmployee();
  };

  return (
    <Modal close={close}>
      <Form onSubmit={handleEmployeeInsert}>
        <H2>Cadastrar Funcionario</H2>

        {createEmployeeStatus}
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
          <RoleOption value="" disabled>Escolha uma função</RoleOption>
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
