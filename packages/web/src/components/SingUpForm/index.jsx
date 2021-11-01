import React, { useState } from 'react';
// import { func } from 'prop-types';

import TextInput from '../TextInput';
import SubmitButton from '../SubmitButton';

import { Container, Form } from './style';

const LoginForm = () => {
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
        e.preventDefault();
      }}
      >
        <TextInput
          type="text"
          placeholder="Seu nome"
          required
          name="nome"
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

// LoginForm.propTypes = {
//   handleUserLogin: func,
// }.isRequired;

export default LoginForm;
