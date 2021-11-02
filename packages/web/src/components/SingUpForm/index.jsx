import React, { useState } from 'react';
import { func } from 'prop-types';

import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

import { Container, Form } from './style';

const singUpForm = ({ handleUserSingUp }) => {
  const [newUser, setNewUser] = useState({});

  const handleInputChange = ({ target }) => {
    const { name, value } = target;

    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  return (
    <Container>
      <Form onSubmit={(e) => {
        handleUserSingUp(e, newUser);
      }}
      >
        <TextInput
          type="text"
          placeholder="Seu nome"
          required
          name="name"
          onChange={handleInputChange}
          minLength={3}
        />
        <TextInput
          onChange={handleInputChange}
          type="email"
          placeholder="Email"
          name="email"
          required
        />
        <TextInput
          type="password"
          onChange={handleInputChange}
          placeholder="Senha"
          name="password"
          required
          minLength={6}
        />

        <SubmitButton
          type="submit"
          bgColor="#1BA29D"
        >
          Registrar
          {/* {loginStatus === 'loading' ? 'Carregando' : 'Entrar'} */}
        </SubmitButton>

      </Form>
    </Container>
  );
};

singUpForm.propTypes = {
  handleUserSingUp: func,
}.isRequired;

export default singUpForm;
